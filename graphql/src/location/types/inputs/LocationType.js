// @flow

import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'LocationType',
  values: {
    airport: { value: 'airport' },
    autonomous_territory: { value: 'autonomous_territory' },
    city: { value: 'city' },
    country: { value: 'country' },
    station: { value: 'station' },
    subdivision: { value: 'subdivision' },
  },
  description: 'Type of location',
});
