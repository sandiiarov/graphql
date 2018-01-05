// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import AllHotelsDataset from '../../datasets/all.json';

beforeEach(() => {
  RestApiMock.onGet(
    'https://hotels-api.skypicker.com/api/hotels?output=hotel_details&radius=50&latitude=51.5&longitude=0&checkin=2017-11-16&checkout=2017-11-23&min_price=10&max_price=100&room1=A',
  ).replyWithData(AllHotelsDataset);
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
            filter: { minPrice: 10.0, maxPrice: 100.0 }
          ) {
            edges {
              node {
                id
              }
            }
          }
        }
      `),
    ).toMatchSnapshot();
  });
});
