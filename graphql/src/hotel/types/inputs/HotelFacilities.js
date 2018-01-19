// @flow

import { GraphQLInputObjectType, GraphQLBoolean } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'HotelFacilitiesInput',
  fields: {
    airportShuttle: {
      type: GraphQLBoolean,
      description: 'Show only hotels having airport shuttle as a service.',
    },

    familyRooms: {
      type: GraphQLBoolean,
      description: 'Show only hotels having family rooms.',
    },

    facilitiesForDisabled: {
      type: GraphQLBoolean,
      description: 'Show only hotels having facilities for disabled.',
    },

    fitnessCenter: {
      type: GraphQLBoolean,
      description: 'Show only hotels having fitness room.',
    },

    parking: {
      type: GraphQLBoolean,
      description: 'Show only hotels having any parking.',
    },

    freeParking: {
      type: GraphQLBoolean,
      description: 'Show only hotels having free parking.',
    },

    valetParking: {
      type: GraphQLBoolean,
      description: 'Show only hotels having valet parking.',
    },

    indoorPool: {
      type: GraphQLBoolean,
      description: 'Show only hotels having indoor swimming pool.',
    },

    petsAllowed: {
      type: GraphQLBoolean,
      description: 'Show only hotels having pets allowed.',
    },

    spa: {
      type: GraphQLBoolean,
      description: 'Show only hotels having spa.',
    },

    wifi: {
      type: GraphQLBoolean,
      description: 'Show only hotels having wifi.',
    },
  },
});
