// @flow

import { GraphQLNonNull, GraphQLList } from 'graphql';
import Booking from './../types/Booking';
import callBookingApi from '../services/Booking';

export default {
  type: new GraphQLList(new GraphQLNonNull(Booking)),
  resolve: () => callBookingApi(),
};
