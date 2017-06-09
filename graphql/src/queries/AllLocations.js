// @flow

import { GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import _ from 'lodash';
import GraphQLLocation from '../types/Location';
import request from '../services/HttpRequest';
import config from '../../config/application';

import type { LocationType, LocationAreaType } from '../Entities';

export default {
  type: new GraphQLList(GraphQLLocation),
  args: {
    term: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (
    _: any,
    args: { term: string },
  ): Promise<Array<LocationType>> => {
    const response = await request(
      config.restApiEndpoint.allLocations({
        term: args.term,
      }),
    );
    return response.locations.map((location): LocationType =>
      sanitizeApiResponse(location),
    );
  },
};

function sanitizeApiResponse(location: Object): LocationType {
  return {
    locationId: location.id,
    name: location.name,
    code: location.code,
    slug: location.slug,
    timezone: location.timezone,
    location: {
      latitude: _.get(location, 'location.lat', null),
      longitude: _.get(location, 'location.lon', null),
    },
    type: location.type,
    city: sanitizeLocationArea(location.city),
    subdivision: sanitizeLocationArea(location.subdivision),
    country: sanitizeLocationArea(location.country),
  };
}

function sanitizeLocationArea(area: null | Object): ?LocationAreaType {
  return area
    ? {
        locationId: area.id,
        name: area.name,
        slug: area.slug,
        code: area.code,
      }
    : null;
}
