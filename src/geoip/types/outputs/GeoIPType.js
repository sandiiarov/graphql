// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';

import Coordinates from '../../../location/types/outputs/Coordinates';

export type GeoIP = {|
  isoCountryCode: string,
  latitude: number,
  longitude: number,
|};

const GeoIPType = new GraphQLObjectType({
  name: 'GeoIP',
  fields: {
    isoCountryCode: {
      type: GraphQLString,
      description: 'ISO country code',
    },
    coordinates: {
      type: Coordinates,
      description: 'Coordinates',
      resolve: (res: GeoIP) => ({
        lat: res.latitude,
        lng: res.longitude,
      }),
    },
  },
});

export default GeoIPType;
