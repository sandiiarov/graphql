// @flow

import { toGlobalId } from '../../services/OpaqueIdentifier';

import { graphql, RestApiMock } from '../../services/TestingTools';
import { Hotels } from '../../datasets';
import Dataloader from '../../dataLoaders/SingleHotel';

// keep the URL hardcoded here so we will know if it changed unintentionally
const baseUrl = 'https://hotels-api.skypicker.com/api/hotelDetails?hotel_ids=';

beforeEach(() => {
  // reset internal state of the data-loader so the tests will not interfere
  Dataloader.clearAll();
});

describe('single hotels query', () => {
  it('works with single hotel ID', async () => {
    RestApiMock.onGet(`${baseUrl}19332`).replyWithData(Hotels['19332']);

    expect(
      await graphql('query($id: ID!) { hotel(id: $id) { id } }', {
        id: toGlobalId('hotel', '19332'),
      }),
    ).toMatchSnapshot();
  });

  it('throws error for unknown ID type (ID mishmash)', async () => {
    // it should request only one URL (not two separated)
    RestApiMock.onGet(`${baseUrl}19332`).replyWithData(Hotels['19332']);

    expect(
      await graphql('query($id: ID!) { hotel(id: $id) { id } }', {
        id: toGlobalId(
          'identity', // known type but not hotel!
          '248539',
        ),
      }),
    ).toMatchSnapshot();
  });

  it('returns partial error for known type but unknown hotel ID', async () => {
    RestApiMock.onGet(`${baseUrl}error`).replyWithData([
      {
        facilities: [],
        rooms: [],
        descriptions: [],
        photos: [],
        chains: [],
        checkin: {},
        checkout: {},
        location: {},
      },
    ]);

    expect(
      await graphql('query($id: ID!) { hotel(id: $id) { id } }', {
        id: toGlobalId('hotel', 'error'),
      }),
    ).toMatchSnapshot();
  });
});

it('works with full example (containing circular references)', async () => {
  expect(
    await graphql(
      `
        query($id: ID!) {
          hotel(id: $id) {
            id
            price {
              amount
              currency
            }
            photoUrl
            cityName
            whitelabelUrl
            facilities(first: 2) {
              edges {
                cursor
                node {
                  id
                  name
                  hotel {
                    id
                  }
                }
              }
            }
            rooms(first: 2) {
              edges {
                cursor
                node {
                  id
                  type
                  maxPersons
                  bedding {
                    type
                    amount
                  }
                  hotel {
                    id
                  }
                }
              }
            }
          }
        }
      `,
      {
        id: toGlobalId('hotel', '19332'),
      },
    ),
  ).toMatchSnapshot();
});
