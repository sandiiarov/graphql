// @flow

import { graphql } from '../../../common/services/TestingTools';

it('returns CS phone numbers', async () => {
  expect(
    await graphql(`
      {
        customerSupport {
          phoneNumbers {
            availabilityDescription
            number
          }
        }
      }
    `),
  ).toMatchSnapshot();
});
