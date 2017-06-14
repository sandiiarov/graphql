// @flow

import { graphql } from '../../services/TestingTools';

it('should return baggage parameters', async () => {
  const baggageQuery = `{
      booking(id: 2707251) {
        allowedBaggage {
          cabin { height, length, width, weight, note }
          checked { height, length, width, weight, note }
        }
      }
    }`;
  expect(await graphql(baggageQuery)).toMatchSnapshot();
});
