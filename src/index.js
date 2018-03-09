// @flow

import http from 'http';
import { ApolloEngine } from 'apollo-engine';
import app from './graphqlServer';

require('dotenv').config();

const port = process.env.PORT || 3000;

if (process.env.ENGINE_KEY) {
  const engine = new ApolloEngine({
    apiKey: String(process.env.ENGINE_KEY),
  });

  engine.listen({
    port,
    expressApp: app,
    graphqlPaths: ['/'],
    frontend: {
      extensions: {
        strip: ['tracing'],
      },
    },
  });
} else {
  // no ENGINE_KEY, start simple server
  http.createServer(app).listen(
    port.toString(),
    () => console.log(`Server is running on port ${port}`), // eslint-disable-line no-console
  );
}
