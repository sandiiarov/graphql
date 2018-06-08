// @flow

import { validate } from '../../../common/services/TestingTools';

it('is possible to query available whitelisted services', async () => {
  expect(
    validate(`
      query ManageMyBooking {
        node(id: "Qm9va2luZ1JldHVybjo2Njc2NDU4") {
          id
          __typename
          ... on BookingOneWay {
            trip {
              duration
            }
          }
          ... on BookingReturn {
            outbound {
              duration
            }
            inbound {
              duration
            }
          }
          ... on BookingMulticity {
            trips {
              duration
            }
          }
        }
        customerBookings {
          edges {
            node {
              id
              __typename
              ... on BookingOneWay {
                trip {
                  duration
                }
              }
              ... on BookingReturn {
                outbound {
                  duration
                }
                inbound {
                  duration
                }
              }
              ... on BookingMulticity {
                trips {
                  duration
                }
              }
            }
          }
        }
      }
    `),
  ).toEqual([]);
});
