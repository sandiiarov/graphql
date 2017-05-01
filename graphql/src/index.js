import graphqlHTTP from 'express-graphql';
import Schema from './Schema';
import { createContext } from './services/GraphqlContext';
import Logger from './services/Logger';

process.on('unhandledRejection', reason => {
  Logger.error(reason);
});

exports.default = (request: Object, response: Object) => {
  const token = request.headers.authorization || null;

  return graphqlHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true,
    context: createContext(token),
    formatError(error) {
      Logger.error(`${error.name}: ${error.message}`);
      return error;
    },
  })(request, response);
};
