// @flow

import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLInt,
} from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';

export default new GraphQLInputObjectType({
  name: 'HotelsSearchInput',
  fields: {
    latitude: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'Latitude in float format (example: 45.4654).',
    },

    longitude: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'Longitude in float format (example: 9.1859).',
    },

    checkin: {
      type: new GraphQLNonNull(GraphQLDate),
    },

    checkout: {
      type: new GraphQLNonNull(GraphQLDate),
    },

    roomsConfiguration: {
      type: new GraphQLNonNull(
        new GraphQLList(
          new GraphQLNonNull(
            new GraphQLInputObjectType({
              name: 'RoomsConfiguration',
              fields: {
                adultsCount: {
                  type: new GraphQLNonNull(GraphQLInt),
                },
                children: {
                  type: new GraphQLList(
                    new GraphQLInputObjectType({
                      name: 'RoomsChildrenConfiguration',
                      fields: {
                        age: {
                          type: GraphQLInt,
                        },
                      },
                    }),
                  ),
                },
              },
            }),
          ),
        ),
      ),
    },
  },
});
