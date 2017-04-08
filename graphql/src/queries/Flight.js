import { GraphQLNonNull } from 'graphql';
import Flight from './../types/Flight';

export default {
  type: new GraphQLNonNull(Flight),
  resolve() {
    return {
      arrival: {
        id: 'arrival-uuid', // FIXME: connect to the API
      },
      departure: {
        id: 'departure-uuid', // FIXME: connect to the API
      },
    };
  },
};
