// @flow

import { GraphQLString, GraphQLObjectType } from 'graphql';

import type { BookingAssets } from '../../Booking';

export default new GraphQLObjectType({
  name: 'BookingAssets',
  fields: {
    ticketUrl: {
      type: GraphQLString,
      description:
        'URL of the electronic ticket. Ticket may not be available yet (returns null).',
      resolve: ({ ticketUrl }: BookingAssets): string => ticketUrl,
    },

    invoiceUrl: {
      type: GraphQLString,
      description: 'URL of the invoice.',
      resolve: ({ invoiceUrl }: BookingAssets): string => invoiceUrl,
    },
  },
});
