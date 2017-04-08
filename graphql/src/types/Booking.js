import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql';
import Arrival from './Arrival';
import Departure from './Departure';
import Flight from './Flight';

export default new GraphQLObjectType({
  name: 'Booking',
  fields() {
    return {
      arrival: {
        type: new GraphQLNonNull(Arrival),
        resolve(booking) {
          return booking.arrival;
        },
      },

      departure: {
        type: new GraphQLNonNull(Departure),
        resolve(booking) {
          return booking.departure;
        },
      },

      flights: {
        type: new GraphQLList(new GraphQLNonNull(Flight)),
      },
    };
  },
});
