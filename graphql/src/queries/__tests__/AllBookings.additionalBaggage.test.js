// @flow

import { executeQuery } from '../../services/TestingTools';

describe('flights query with legs', () => {
  it('should return valid array of flight legs', async () => {
    const additionalBaggageQuery = `{
      allBookings {
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
    }`;
    expect(await executeQuery(additionalBaggageQuery)).toMatchSnapshot();
  });
});
