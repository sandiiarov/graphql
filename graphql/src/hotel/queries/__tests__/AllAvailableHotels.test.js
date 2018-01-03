// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import AllHotelsDataset from '../../datasets/all.json';
import FirstHotelDataset from '../../datasets/25215.json';
import SecondHotelDataset from '../../datasets/248539.json';
import RoomBlocksDataset from '../../datasets/roomBlocks.json';
import RoomDetailsDataset from '../../datasets/roomDetails.json';

beforeEach(() => {
  // minimal query
  RestApiMock.onGet(
    'https://hotels-api.skypicker.com/api/hotels?output=hotel_details&radius=50&latitude=45.4654&longitude=9.1859&checkin=2017-11-16&checkout=2017-11-23&room1=A',
  ).replyWithData(AllHotelsDataset);

  // full query
  RestApiMock.onGet(
    'https://hotels-api.skypicker.com/api/hotels?output=hotel_details&radius=50&latitude=45.4654&longitude=9.1859&checkin=2017-11-16&checkout=2017-11-23&room1=A%2CA%2C4%2C6&room2=A%2C2',
  ).replyWithData(AllHotelsDataset);
  RestApiMock.onGet(
    'https://hotels-api.skypicker.com/api/hotelDetails?hotel_ids=25215%2C248539',
  ).replyWithData(FirstHotelDataset.concat(SecondHotelDataset));
  RestApiMock.onGet(
    'https://hotels-api.skypicker.com/api/blocks?arrival_date=2017-11-16&departure_date=2017-11-23&hotel_ids=25215',
  ).replyWithData(RoomBlocksDataset);
  RestApiMock.onGet(
    // this can be merged into previous request (hotel_ids=25215,248539) but we are not doing this optimization yet
    'https://hotels-api.skypicker.com/api/blocks?arrival_date=2017-11-16&departure_date=2017-11-23&hotel_ids=248539',
  ).replyWithData(RoomBlocksDataset);
  RestApiMock.onGet(
    'https://hotels-api.skypicker.com/api/roomDetails?hotel_ids=25215',
  ).replyWithData(RoomDetailsDataset);
  RestApiMock.onGet(
    'https://hotels-api.skypicker.com/api/roomDetails?hotel_ids=248539',
  ).replyWithData([]); // Booking.com failure
});

describe('all hotels query', () => {
  it('should work for minimal example', async () => {
    expect(
      await graphql(`
        {
          allAvailableHotels(
            search: {
              latitude: 45.4654
              longitude: 9.1859
              checkin: "2017-11-16"
              checkout: "2017-11-23"
              roomsConfiguration: { adultsCount: 1 }
            }
          ) {
            edges {
              cursor
              node {
                id
              }
            }
          }
        }
      `),
    ).toMatchSnapshot();
  });

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
                  }
                }
                hotel {
                  id
                  originalId
                  summary
                }
              }
            }
          }
        }
      `),
    ).toMatchSnapshot();
  });
});
