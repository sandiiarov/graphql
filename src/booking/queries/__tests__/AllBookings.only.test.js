// @flow

import { validate } from '../../../common/services/TestingTools';

it('allows to use FUTURE filter', async () => {
  const legsQuery = `{
      future: allBookings(only: FUTURE) {
        edges {
          cursor
        }
      }
    }`;
  expect(validate(legsQuery)).toEqual([]);
});

it('allows to use PAST filter', async () => {
  const legsQuery = `{
      future: allBookings(only: PAST) {
        edges {
          cursor
        }
      }
    }`;
  expect(validate(legsQuery)).toEqual([]);
});

it('works without "only" filter', async () => {
  const legsQuery = `{
      future: allBookings {
        edges {
          cursor
        }
      }
    }`;
  expect(validate(legsQuery)).toEqual([]);
});
