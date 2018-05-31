// @flow

import { GraphQLNonNull, GraphQLString } from 'graphql';

import { post } from '../../common/services/HttpRequest';
import config from '../../../config/application';
import GraphQLResetPasswordResponse from '../types/outputs/ResetPasswordResponse';
import { ProxiedError } from '../../common/services/errors/ProxiedError';

export type ResetPasswordAnswer = {|
  success: boolean,
|};

export default {
  type: GraphQLResetPasswordResponse,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_: mixed, args: Object): Promise<ResetPasswordAnswer> => {
    const restApiEndpoint = 'https://auth.skypicker.com/v1/user.resetPassword';
    const payload = {
      login: args.email,
    };
    const headers = {
      Authorization: `Basic ${config.auth.basicToken}`,
      'Content-Type': `application/json`,
    };
    const data = await post(restApiEndpoint, payload, headers);

    if (data.error_code !== undefined) {
      throw new ProxiedError(
        data.message ? data.message : 'Password reset has not been successful.',
        data.error_code,
        restApiEndpoint,
      );
    }

    return {
      success: true,
    };
  },
};
