// @flow

import { GraphQLNonNull, GraphQLString } from 'graphql';
import request from '../services/HttpRequest';
import config from '../../config/application';
import fetch from 'node-fetch';

export default {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_: mixed, args: Object) => {
    const body = JSON.stringify({
      login: args.email,
      password: args.password,
    });
    const headers = {
      Authorization: 'Basic ***REMOVED***',
      'Content-Type': 'application/json',
    };
    const res = await fetch(config.restApiEndpoint.login, {
      body,
      headers,
      method: 'POST',
    });
    const data = await res.json();
    return data.token;
  },
};
