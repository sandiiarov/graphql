// @flow

import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'BookingType',
  values: {
    ONE_WAY: { value: 'BookingOneWay' },
    RETURN: { value: 'BookingReturn' },
    MULTICITY: { value: 'BookingMulticity' },
  },
});
