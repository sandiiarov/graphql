// @flow

import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';

import Schema from './Schema';
import { createContext } from './services/GraphqlContext';
import Logger from './services/Logger';
import { ProxiedError } from './services/errors/ProxiedError';

process.on('unhandledRejection', reason => {
  Logger.error(reason);
});

const app = express();

app.use(
  cors({
    methods: ['GET', 'POST'],
  }),
);

app.use('/', (request, response) => {
  graphqlHTTP({
    schema: Schema,
    pretty: false,
    graphiql: true,
    context: createContext(request.header('authorization') || null),
    formatError(error) {
      let errorMessage = `${error.name}: ${error.message}`;

      const originalError = error.originalError;
      if (originalError instanceof ProxiedError) {
        error._proxy = {
          statusCode: originalError.originStatusCode,
          url: originalError.originUrl,
        };
        errorMessage += ` ${originalError.originUrl}`;
      }

      Logger.error(errorMessage);
      return error;
    },
  })(request, response);
});

export default app;
