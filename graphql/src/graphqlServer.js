// @flow

import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import OpticsAgent from 'optics-agent';
import type { $Request, $Response } from 'express';

import Schema from './Schema';
import { createContext } from './common/services/GraphqlContext';
import Logger from './common/services/Logger';
import { ProxiedError } from './common/services/errors/ProxiedError';

require('dotenv').config();

process.on('unhandledRejection', reason => {
  Logger.error(reason);
});

const app = express();
app.use(cors({ methods: ['GET', 'POST'] }));

const useOptics = !!(
  process.env.NODE_ENV !== 'test' && process.env.OPTICS_API_KEY
);

if (useOptics) {
  OpticsAgent.instrumentSchema(Schema);
  app.use(OpticsAgent.middleware());
}

app.use('/', (request: $Request, response: $Response) => {
  const token = request.header('authorization') || null;
  const context = createContext(token);
  if (useOptics) {
    context.opticsContext = OpticsAgent.context(request);
  }
  return createGraphqlServer(Schema, context)(request, response);
});

export default app;

function createGraphqlServer(schema, context) {
  return graphqlHTTP({
    schema: schema,
    pretty: false,
    graphiql: true,
    context: context,
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
  });
}
