// @flow

import { validate } from '../../../common/services/TestingTools';

it('is possible to query available whitelisted services', async () => {
  expect(
    validate(`
      query TripServicesQuery {
        booking(id: 1234567) {
          availableWhitelabeledServices {
            lounge(departureTime: "2007-12-03T10:15:30Z") {
              relevantAirports {
                whitelabelURL
                location {
                  slug
                }
              }
            }
            parking(fromDate: "2007-12-03T10:15:30Z", toDate: "2007-12-24T10:15:30Z") {
              whitelabelURL
            }
            carRental(pickup: "2007-12-03T10:15:30Z", dropoff: "2007-12-24T10:15:30Z") {
              relevantCities {
                whitelabelURL
                location {
                  slug
                }
              }
            }
          }
        }
      }
    `),
  ).toEqual([]);
});
