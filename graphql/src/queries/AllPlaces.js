// @flow

import { GraphQLNonNull, GraphQLList, GraphQLString } from 'graphql';
import GraphQLPlace from '../types/Place';
import request from '../services/HttpRequest';
import config from '../../config/application';

import type { PlaceType } from '../Entities';

export default {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLPlace))),
  args: {
    search: {
      type: GraphQLString,
    },
  },
  resolve: async (_: mixed, args: Object): Promise<Array<PlaceType>> => {
    const response = await request(
      config.restApiEndpoint.allPlaces({
        term: args.search,
      }),
    );
    return response.map((place): PlaceType => sanitizeApiResponse(place));
  },
  deprecationReason: 'Places are no longer supported. Use allLocations instead.',
};

function sanitizeApiResponse(singlePlace: Object): PlaceType {
  return {
    id: singlePlace.id,
    location: {
      latitude: singlePlace.lat,
      longitude: singlePlace.lng,
    },
    numberOfAirports: singlePlace.numberOfAirports,
    population: singlePlace.population,
    name: singlePlace.value,
  };
}
