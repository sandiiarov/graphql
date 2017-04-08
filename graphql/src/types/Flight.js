import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import Arrival from './Arrival';
import Departure from './Departure';

export default new GraphQLObjectType({
  name: 'Flight',
  fields() {
    return {
      arrival: {
        type: new GraphQLNonNull(Arrival),
        resolve(flight) {
          return flight.arrival;
        },
      },
      departure: {
        type: new GraphQLNonNull(Departure),
        resolve(flight) {
          return flight.departure;
        },
      },
    };
  },
});
