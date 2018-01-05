// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import AllHotelsDataset from '../../datasets/all.json';

beforeEach(() => {
  RestApiMock.onGet(
    'https://hotels-api.skypicker.com/api/hotels?output=hotel_details&city_ids=-2140205&checkin=2017-11-16&checkout=2017-11-23&room1=A',
  ).replyWithData(AllHotelsDataset);
});

describe('all hotels query', () => {
  it('should work for full query', async () => {
    expect(
      await graphql(`
        {
          allAvailableHotels(
            search: {
              cityId: "aG90ZWxDaXR5Oi0yMTQwMjA1" # hotelCity:-2140205
              checkin: "2017-11-16"
              checkout: "2017-11-23"
              roomsConfiguration: [{ adultsCount: 1 }]
            }
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
