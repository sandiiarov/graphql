// @flow

import { GraphQLNonNull } from 'graphql';

import GraphQLIP from '../../common/types/scalars/IP';
import GeoIPType from '../types/outputs/GeoIPType';
import getGeoIP from '../apis/geoip';

const geoIPQuery = {
  type: GeoIPType,
  description: 'Geography info by an IP address',
  args: {
    ip: {
      type: new GraphQLNonNull(GraphQLIP),
    },
  },
  resolve: (_: *, { ip }: *) => getGeoIP(ip),
};

export default geoIPQuery;
