// @flow

import { validate } from '../../../common/services/TestingTools';

it('is possible to query available whitelisted services', async () => {
  expect(
    validate(`
      query TripServicesQuery {
        booking(id: 1234567) {
          availableServices {
            insurance {
              passengers {
                fullName
              }
            }
          }
        }
      }
    `),
  ).toEqual([]);
});
