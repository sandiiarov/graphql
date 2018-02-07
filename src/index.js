// @flow

import http from 'http';
import app from './graphqlServer';

const PORT = '3000';
http
  .createServer(app)
  .listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // eslint-disable-line no-console
