import { GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';

export default new GraphQLObjectType({
  name: 'Arrival',
  fields() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve(arrival) {
          return arrival.id;
        },
      },
    };
  },
});
