// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import AllHotelsDataset from '../../datasets/all.json';
import FirstHotelDataset from '../../datasets/25215.json';
import SecondHotelDataset from '../../datasets/248539.json';

beforeEach(() => {
  RestApiMock.onGet(
    'https://hotels-api.skypicker.com/api/hotels?output=hotel_details&radius=50&latitude=51.5&longitude=0&checkin=2017-11-16&checkout=2017-11-23&stars=0%2C2%2C4%2C5&room1=A',
  ).replyWithData(AllHotelsDataset);
  RestApiMock.onGet(
    'https://hotels-api.skypicker.com/api/hotelDetails?hotel_ids=25215%2C248539',
  ).replyWithData(FirstHotelDataset.concat(SecondHotelDataset));
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
