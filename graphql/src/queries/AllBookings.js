// @flow

import { GraphQLNonNull, GraphQLList } from 'graphql';
import Booking from '../types/Booking';
import request from '../services/HttpRequest';
import config from '../../config/application';

// TODO
const token = 'WyJTNVRTWTBOdXNWT3NRUlR5UnBNZV9HIiwiWFZQTTdIOFJVeW5OTFJsYjZGMllmZW9ZRWx0Y05NdWNzRWdkeUFyYmIxdC96bDFlcTNoL2UiLDU4NDc4NTY0NV0.ki35__EbDMoVIvHb7BqdqX3Sg58';

export default {
  type: new GraphQLList(new GraphQLNonNull(Booking)),
  resolve: () => request(config.restApiEndpoint.allBookings, token),
};
