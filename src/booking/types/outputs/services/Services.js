// @flow

import { GraphQLObjectType } from 'graphql';
import { DateTime } from 'luxon';

import InsuranceService from './InsuranceService';
import type { BookingsItem } from '../../../Booking';

type AncestorType = {|
  +booking: BookingsItem,
|};

export default new GraphQLObjectType({
  name: 'Services',
  fields: {
    insurance: {
      type: InsuranceService,
      description: 'Travel insurance - returns "null" if not available.',
      resolve: async ({ booking }: AncestorType) => {
        // booking must be CONFIRMED
        if (booking.status !== 'confirmed') {
          return null;
        }

        if (!booking.departure.when) {
          return null;
        }

        // departure must be at least 48 hours from now
        const diff = DateTime.fromJSDate(booking.departure.when.utc)
          .diff(DateTime.fromJSDate(new Date()), 'hours')
          .toObject().hours;

        if (diff < 48) {
          return null;
        }

        // we do not provide insurance for US nationality (need to check all PAX)
        const validPax = booking.passengers.filter(
          pap => pap.nationality !== 'us',
        );
        if (validPax.length === 0) {
          return null;
        }

        return {
          passengers: validPax,
        };
      },
    },
  },
});
