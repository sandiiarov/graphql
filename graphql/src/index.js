import graphqlHTTP from 'express-graphql';
import Schema from './Schema';
import { createContext } from './services/GraphqlContext';

process.on('unhandledRejection', reason => {
  console.error(reason);
});

exports.default = (request: Object, response: Object) => {
  const token = request.headers.authorization || null;

  return graphqlHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true,
    context: createContext(token),
    formatError(error) {
      console.error(error);
      return error;
    },
  })(request, response);
};
