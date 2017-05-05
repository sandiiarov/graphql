// @flow

import graphqlHTTP from 'express-graphql';
import cors from 'micro-cors';
import type { IncomingMessage, ServerResponse } from 'http';

import Schema from './Schema';
import { createContext } from './services/GraphqlContext';
import Logger from './services/Logger';

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
      return error;
    },
  })(request, response);
};

exports.default = cors({ allowMethods: ['GET', 'POST'] })(handler);
