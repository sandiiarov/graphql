// @flow

import { graphql } from '../../../../../common/services/TestingTools';

it('returns null for no relevant airports', async () => {
  const query = `{
    booking(id: 1234) {
      availableWhitelabeledServices {
        lounge(departureTime:"2018-07-01") {
          relevantAirports {
            whitelabelURL
          }
        }
      }
    }
  }`;
  const response = await graphql(query);
  expect(response.errors[0].message).toEqual(
    'Expected type DateTime!, found "2018-07-01"; DateTime cannot represent an invalid date-time-string 2018-07-01.',
  );
});
