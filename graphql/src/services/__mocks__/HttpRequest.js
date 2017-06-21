// @flow

import config from '../../../config/application';

/* eslint-disable */

/**
 * @deprecated
 */
const mocksMap = {
  [config.restApiEndpoint.allFlights({
    flyFrom: 'PRG',
    to: 'MEX',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  })]: require(`../../queries/__tests__/__datasets__/AllFlights.json`),
  [config.restApiEndpoint.allFlights({
    flyFrom: 'PRG',
    to: 'MEX',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
    curr: 'CZK',
  })]: require(`../../queries/__tests__/__datasets__/AllFlights.czk.json`),
  [config.restApiEndpoint.allFlights({
    flyFrom: 'Prague',
    to: 'Mexico',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  })]: require(`../../queries/flight/__tests__/__datasets__/AllFlights.no-results.json`),
  [config.restApiEndpoint.allFlights({
    flyFrom: 'prague_cz',
    to: 'MEX',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  })]: require(`../../queries/__tests__/__datasets__/AllFlights.json`),
  [config.restApiEndpoint
    .airlines]: require('../../dataLoaders/__tests__/__datasets__/airlines.json'),
  [config.restApiEndpoint.allFlights({
    flyFrom: 'Prague,Frankfurt',
    to: 'Mexico',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  })]: require(`../../queries/flight/__tests__/__datasets__/AllFlights.no-results.json`),
  [config.restApiEndpoint.allFlights({
    flyFrom: 'Prague,50.11-8.68-10km',
    to: 'Mexico',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  })]: require(`../../queries/flight/__tests__/__datasets__/AllFlights.no-results.json`),
  [config.restApiEndpoint.allFlights({
    flyFrom: 'prague_cz,frankfurt_de',
    to: 'MEX',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  })]: require(`../../queries/flight/__tests__/__datasets__/AllFlights.PRG,FRA-MEX.json`),
  [config.restApiEndpoint.allFlights({
    flyFrom: 'prague_cz,50.11-8.68-10km',
    to: 'MEX',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  })]: require(`../../queries/flight/__tests__/__datasets__/AllFlights.PRG,FRA-MEX.json`),
  [config.restApiEndpoint
    .identity]: require('../../dataLoaders/__tests__/__datasets__/user.get.json'),
  [config.restApiEndpoint.login]: {
    user_id: 21,
    token: 't0k3n',
  },
  [config.restApiEndpoint.airlines]: require('../../dataLoaders/__tests__/__datasets__/airlines.json'),
  [config.restApiEndpoint.allLocations({ term: 'Prague'})]: require('../../queries/flight/__tests__/__datasets__/AllLocations.prague.json'),
  [config.restApiEndpoint.allLocations({ term: 'unknown place'})]: require('../../queries/__tests__/__datasets__/AllLocations.unknown.json'),
  [config.restApiEndpoint.allLocations({ term: 'Prague'})]:
    require('../../queries/flight/__tests__/__datasets__/AllLocations.prague.json'),
  [config.restApiEndpoint.allLocations({ term: 'Mexico'})]:
    require('../../queries/flight/__tests__/__datasets__/AllLocations.mexico.json'),
  [config.restApiEndpoint.allLocations({ term: 'Frankfurt'})]:
    require('../../queries/flight/__tests__/__datasets__/AllLocations.frankfurt.json'),
};
/* eslint-enable */

export default function request(absoluteApiUrl: string): Promise<Object> {
  const mockResponse = stackOfMockResponses.GET[absoluteApiUrl];
  if (mockResponse !== undefined) {
    return Promise.resolve(mockResponse);
  }

  if (mocksMap[absoluteApiUrl] !== undefined) {
    return new Promise(resolve => {
      resolve(mocksMap[absoluteApiUrl]);
    });
  }
  throw new Error(`Data mock not found for path: ${absoluteApiUrl}`);
}

export async function post(absoluteApiUrl: string): Promise<Object> {
  const mockResponse = stackOfMockResponses.POST[absoluteApiUrl];
  if (mockResponse !== undefined) {
    return Promise.resolve(mockResponse);
  }

  // backward compatibility
  if (mocksMap[absoluteApiUrl] === undefined) {
    throw new Error(`Data mock not found for path: ${absoluteApiUrl}`);
  }
  return Promise.resolve(mocksMap[absoluteApiUrl]);
}

const stackOfMockResponses: {
  [string]: Object,
} = {
  POST: {},
  GET: {},
};

export function __setMockData(
  httpMethod: string,
  absoluteUrl: string,
  mockData: Object,
) {
  stackOfMockResponses[httpMethod][absoluteUrl] = mockData;
}
