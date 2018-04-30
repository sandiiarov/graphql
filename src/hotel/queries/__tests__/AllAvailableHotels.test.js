// @flow

import {
  graphql,
  BookingComApiMock,
} from '../../../common/services/TestingTools';
import AllHotelsDataset from '../../datasets/all.json';
import FirstHotelDataset from '../../datasets/25215.json';
import SecondHotelDataset from '../../datasets/248539.json';
import RoomBlocksDataset from '../../datasets/roomBlocks.json';
import RoomDetailsDataset from '../../datasets/roomDetails.json';

beforeEach(() => {
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotelAvailability?extras=hotel_details&order_by=popularity&radius=50&latitude=45.4654&longitude=9.1859&checkin=2017-11-16&checkout=2017-11-23&rows=50&room1=A%2CA%2C4%2C6&room2=A%2C2',
  ).replyWithData(AllHotelsDataset);
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotels?extras=hotel_info%2Chotel_photos%2Chotel_description%2Chotel_facilities%2Cpayment_details%2Croom_info%2Croom_photos%2Croom_description%2Croom_facilities&hotel_ids=25215%2C248539&language=en-us',
  ).replyWithData({
    result: FirstHotelDataset.result.concat(SecondHotelDataset.result),
  });
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/blockAvailability?detail_level=1&checkin=2017-11-16&checkout=2017-11-23&hotel_ids=25215&currency=EUR',
  ).replyWithData(RoomBlocksDataset);
  BookingComApiMock.onGet(
    // this can be merged into previous request (hotel_ids=25215,248539) but we are not doing this optimization yet
    'https://distribution-xml.booking.com/2.0/json/blockAvailability?detail_level=1&checkin=2017-11-16&checkout=2017-11-23&hotel_ids=248539&currency=EUR',
  ).replyWithData(RoomBlocksDataset);
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotels?extras=hotel_info%2Chotel_photos%2Chotel_description%2Chotel_facilities%2Cpayment_details%2Croom_info%2Croom_photos%2Croom_description%2Croom_facilities&hotel_ids=25215&language=en-us',
  ).replyWithData(RoomDetailsDataset);
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotels?extras=hotel_info%2Chotel_photos%2Chotel_description%2Chotel_facilities%2Cpayment_details%2Croom_info%2Croom_photos%2Croom_description%2Croom_facilities&hotel_ids=248539&language=en-us',
  ).replyWithData([]); // Booking.com failure
});

describe('all hotels query', () => {
  it('should work for full query', async () => {
    expect(
      await graphql(`
        {
          allAvailableHotels(
            search: {
              latitude: 45.4654
              longitude: 9.1859
              checkin: "2017-11-16"
              checkout: "2017-11-23"
              roomsConfiguration: [
                { adultsCount: 2, children: [{ age: 4 }, { age: 6 }] }
                { adultsCount: 1, children: [{ age: 2 }] }
              ]
            }
          ) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            edges {
              node {
                id
                price {
                  amount
                  currency
                }
                availableRooms {
                  id
                  originalId
                  minimalPrice {
                    amount
                    currency
                  }
                  incrementalPrice {
                    amount
                    currency
                  }
                  room {
                    id
                    type
                    roomSize
                  }
                }
                hotel {
                  id
                  originalId
                  summary
                  review {
                    score
                    description
                    count
                  }
                }
              }
            }
          }
        }
      `),
    ).toMatchSnapshot();
  });
});
