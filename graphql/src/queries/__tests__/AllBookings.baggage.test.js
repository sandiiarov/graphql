// @flow

import { executeQuery } from '../../services/TestingTools';

it('should return baggage parameters', async () => {
  const baggageQuery = `{
      allBookings {
        databaseId
        allowedBaggage {
          cabin { height, length, width, weight, note }
          checked { height, length, width, weight, note }
        }
      }
    }`;
  expect(await executeQuery(baggageQuery)).toMatchSnapshot();
});
