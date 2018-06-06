// @flow

import { GraphQLObjectType, GraphQLList } from 'graphql';

import CustomerSupportPhoneNumber from './CustomerSupportPhoneNumber';

export default new GraphQLObjectType({
  name: 'CustomerSupport',
  fields: {
    phoneNumbers: {
      type: GraphQLList(CustomerSupportPhoneNumber),
      resolve: () => [
        {
          availabilityDescription: 'Support Available in English 24/7',
          number: '44 2038085910',
        },
        {
          availabilityDescription: 'Mon - Fri 9am-5pm CEST; English 24/7',
          number: '54 1159843603',
        },
        {
          availabilityDescription:
            'Support Available in German Mon-Fr 9am-5PM CET; French Mon-Fr 9am-5PM CET; Italian Mon-Fr 9am-5PM CET; English 24/7',
          number: '41 435080835',
        },
      ],
    },
  },
});
