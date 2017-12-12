// @flow

import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'BookingStatus',
  values: {
    NEW: { value: 'open' },
    REFUNDED: { value: 'refunded' },
    PENDING: { value: 'pending' },
    CONFIRMED: { value: 'confirmed' },
    CANCELLED: { value: 'cancelled' },
    DELETED: { value: 'deleted' },
    CLOSED: { value: 'closed' },
    EXPIRED: { value: 'expired' },
  },
});
