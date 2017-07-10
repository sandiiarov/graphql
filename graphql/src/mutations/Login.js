// @flow

import { GraphQLNonNull, GraphQLString } from 'graphql';
import { post } from '../services/HttpRequest';
import config from '../../config/application';
import GraphQLUser from '../outputs/User';
import { createContext } from '../services/GraphqlContext';
import { ProxiedError } from '../services/errors/ProxiedError';

import type { GraphqlContextType } from '../services/GraphqlContext';
import type { Login } from '../types/User';

export default {
  type: GraphQLUser,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (
    _: mixed,
    args: Object,
    context: GraphqlContextType,
  ): Promise<Login> => {
    const payload = {
      login: args.email,
      password: args.password,
    };
    const headers = {
      Authorization: `Basic ${config.auth.basicToken}`,
    };
    const data = await post(config.restApiEndpoint.login, payload, headers);

    if (data.error_code !== undefined) {
      throw new ProxiedError(
        data.message ? data.message : 'Login has not been successful.',
        data.error_code,
        config.restApiEndpoint.login,
      );
    }

    // now we have access token, let's rewrite IdentityLoader
    const authContext = createContext(data.token);
    context.dataLoader = authContext.dataLoader;

    return {
      token: data.token,
      userId: data.user_id,
    };
  },
};
