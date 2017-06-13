// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from 'graphql-relay';
import _ from 'lodash';
import GraphQLLocation from '../types/Location';
import request from '../services/HttpRequest';
import config from '../../config/application';

import type { LocationType, LocationAreaType } from '../Entities';

const { connectionType: AllLocationsConnection } = connectionDefinitions({
  nodeType: GraphQLLocation,
});

export default {
  type: AllLocationsConnection,
  args: {
    ...connectionArgs,
    term: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (ancestor: mixed, args: Object) => {
    const response = await request(
      config.restApiEndpoint.allLocations({
        term: args.term,
      }),
    );
    return Array.isArray(response.locations)
      ? connectionFromArray(
          response.locations.map((location): LocationType =>
            sanitizeApiResponse(location),
          ),
          args,
        )
      : [];
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
