// @flow

import { GraphQLNonNull, GraphQLString } from 'graphql';
import config from '../../config/application';
import GraphQLLogin from '../types/Login';
import { post } from '../services/HttpRequest';

export default {
  type: new GraphQLNonNull(GraphQLLogin),
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_: mixed, args: Object) => {
    const payload = {
      login: args.email,
      password: args.password,
    };
    const headers = {
      Authorization: `Basic ${config.auth.basicToken}`,
    };
    const data = await post(config.restApiEndpoint.login, payload, headers);

    data.userId = data.user_id;
    delete data.user_id;
    return data;
  },
};
