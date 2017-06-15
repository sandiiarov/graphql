// @flow

import { graphql } from '../../services/TestingTools';

describe('flights query with legs', () => {
  it('should return valid array of flight legs', async () => {
    const additionalBaggageQuery = `{
      allBookings {
        edges {
          node {
            databaseId 
            allowedBaggage {
              additionalBaggage {
                price {
                  amount
                  currency
                }
                quantity
              }
            }
          }
        }
      }
    }`;
    expect(await graphql(additionalBaggageQuery)).toMatchSnapshot();
  });
});
