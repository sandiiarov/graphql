// @flow

import graphqlHTTP from 'express-graphql';
import cors from 'micro-cors';

import type { IncomingMessage, ServerResponse } from 'http';

import Schema from './Schema';
import { createContext } from './services/GraphqlContext';
import Logger from './services/Logger';
import { ProxiedError } from './services/errors/ProxiedError';

process.on('unhandledRejection', reason => {
  Logger.error(reason);
});

const handler = (request: IncomingMessage, response: ServerResponse) => {
  const token = request.headers.authorization || null;

  return graphqlHTTP({
    schema: Schema,
    pretty: false,
    graphiql: true,
    context: createContext(token),
    formatError(error) {
      Logger.error(`${error.name}: ${error.message}`);

      const originalError = error.originalError;
      if (originalError instanceof ProxiedError) {
        error._proxy = {
          statusCode: originalError.originStatusCode,
          url: originalError.originUrl,
        };
      }

      return error;
    },
  })(request, response);
};

exports.default = cors({ allowMethods: ['GET', 'POST'] })(handler);
