// @flow

import { GraphQLNonNull, GraphQLString } from 'graphql';
import { post } from '../services/HttpRequest';
import config from '../../config/application';
import GraphQLUser from '../types/User';
import createIdentityLoader from '../dataLoaders/Identity';
import type { GraphqlContextType } from '../services/GraphqlContext';
import type { LoginType } from '../Entities';

export default {
  type: new GraphQLNonNull(GraphQLUser),
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
  ): Promise<LoginType> => {
    const payload = {
      login: args.email,
      password: args.password,
    };
    const headers = {
      Authorization: `Basic ${config.auth.basicToken}`,
    };
    const data = await post(config.restApiEndpoint.login, payload, headers);

    // now we have access token, let's rewrite IdentityLoader
    context.dataLoader.identity = createIdentityLoader(data.token);

    data.userId = data.user_id;
    delete data.user_id;
    return data;
  },
};
