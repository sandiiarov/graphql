import { GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';

export default new GraphQLObjectType({
  name: 'Departure',
  fields() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve(departure) {
          return departure.id;
        },
      },
    };
  },
});
