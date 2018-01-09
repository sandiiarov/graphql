// @flow

import {
  graphql,
  BookingComApiMock,
} from '../../../common/services/TestingTools';
import AllHotelsDataset from '../../datasets/all.json';
import FirstHotelDataset from '../../datasets/25215.json';
import SecondHotelDataset from '../../datasets/248539.json';

beforeEach(() => {
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotelAvailability?extras=hotel_details&radius=50&latitude=51.5&longitude=0&checkin=2017-11-16&checkout=2017-11-23&stars=0%2C2%2C4%2C5&room1=A',
  ).replyWithData(AllHotelsDataset);
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotels?extras=hotel_info%2Chotel_photos%2Chotel_description%2Chotel_facilities%2Cpayment_details%2Croom_info%2Croom_photos%2Croom_description%2Croom_facilities&hotel_ids=25215%2C248539',
  ).replyWithData({
    result: [FirstHotelDataset.result[0], SecondHotelDataset.result[0]],
  });
});

describe('all hotels query', () => {
  it('should work for full query', async () => {
    expect(
      await graphql(`
        {
          allAvailableHotels(
            search: {
              latitude: 51.5
              longitude: 0
              checkin: "2017-11-16"
              checkout: "2017-11-23"
              roomsConfiguration: [{ adultsCount: 1 }]
            }
            filter: { starsRating: [0, 2, 4, 4, 5, 10] }
          ) {
            edges {
              node {
                hotel {
                  originalId
                  rating {
                    stars
                    categoryName
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
