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
    AlgoliaMock.setMatchedByPrefix(matchingCities);
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
    AlgoliaMock.setMatchedByPrefix(matchingCities, 'abc');
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
    AlgoliaMock.setMatchedByPrefix([], 'abcd');
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

  it('works with position parameter', async () => {
    const lat = 51;
    const lng = 14;
    AlgoliaMock.setNearbyCities(matchingCities, lat, lng);
    expect(
      await graphql(
        `
          query hotelCities($lat: Float!, $lng: Float!) {
            hotelCities(position: { lat: $lat, lng: $lng }) {
              edges {
                node {
                  id
                }
              }
            }
          }
        `,
        { lat, lng },
      ),
    ).toMatchSnapshot();
  });
});
