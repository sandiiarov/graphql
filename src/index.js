// @flow

import http from 'http';
import app from './graphqlServer';

const server = http.createServer(app).listen(3000);
let currentApp = app;

if (module.hot) {
  module.hot.accept('./graphqlServer', () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}
