// @flow

import AlgoliaMock from 'algoliasearch';
import { graphql } from '../../../common/services/TestingTools';

jest.mock('algoliasearch');

const matchingCities = [
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
  it('works with empty string prefix', async () => {
    AlgoliaMock.setMatchedCities(matchingCities);
    expect(
      await graphql(
        `
          {
            hotelCities {
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
    AlgoliaMock.setMatchedCities(matchingCities, 'abc');
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
    AlgoliaMock.setMatchedCities([], 'abcd');
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
