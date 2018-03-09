// @flow

import { ApolloEngine } from 'apollo-engine';
import app from './graphqlServer';

require('dotenv').config();

const port = process.env.PORT || 3000;
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
