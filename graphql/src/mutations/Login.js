// @flow

import { GraphQLNonNull, GraphQLString } from 'graphql';
import DataLoader from 'dataloader';
import { post } from '../services/HttpRequest';
import config from '../../config/application';
import GraphQLLogin from '../types/Login';
import IdentityLoader from '../dataLoaders/Identity';
import type { GraphqlContextType } from '../services/GraphqlContext';
import type { LoginType } from '../Entities';

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
    const identityLoader = new DataLoader((ids: Array<string>) => {
      return IdentityLoader(data.token)(ids);
    });
    context.dataLoader.identity = identityLoader;

    data.userId = data.user_id;
    delete data.user_id;
    return data;
  },
};
