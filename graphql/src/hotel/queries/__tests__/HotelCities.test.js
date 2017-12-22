// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';

// keep the URL hardcoded here so we will know if it changed unintentionally
const baseUrl = 'https://hotels-api.skypicker.com/api/cities?prefix=';
const validResponse = [
  {
    location: {
      longitude: '4.97104',
      latitude: '52.27028',
    },
    nr_hotels: 11,
    country: 'nl',
    translations: [
      {
        name: 'Abcoude',
        language: 'en',
      },
    ],
    name: 'Abcoude',
    city_id: -2140205,
  },
];

describe('hotel cities query', () => {
  it('throws error for too short prefix', async () => {
    expect(
      await graphql(
        `
          {
            hotelCities(prefix: "ab") {
              edges {
                node {
                  id
                }
              }
            }
          }
        `,
      ),
    ).toMatchSnapshot();
  });

  it('works for normal request', async () => {
    RestApiMock.onGet(`${baseUrl}abc`).replyWithData(validResponse);
    expect(
      await graphql(
        `
          {
            hotelCities(prefix: "abc", first: 1) {
              edges {
                node {
                  id
                  name
                  location {
                    lat
                    lng
                  }
                  numberOfHotels
                }
              }
            }
          }
        `,
      ),
    ).toMatchSnapshot();
  });

  it('works with empty response', async () => {
    RestApiMock.onGet(`${baseUrl}abcd`).replyWithData([]);
    expect(
      await graphql(
        `
          {
            hotelCities(prefix: "abcd") {
              edges {
                node {
                  id
                }
              }
            }
          }
        `,
      ),
    ).toMatchSnapshot();
  });
});
