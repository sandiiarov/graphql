// @flow

import config from '../../../config/application';

/* eslint-disable */
/**
 * @deprecated
 */
const mocksRegexpMap = [
  {
    test: config.restApiEndpoint.allBookings +
      '/2707251(\\?simple_token=[0-9a-f-]{36})?',
    data: require('../../queries/__tests__/__datasets__/booking-2707251.json'),
  },
  {
    test: config.restApiEndpoint.allBookings +
      '/2707229\\?simple_token=[0-9a-f-]{36}',
    data: require('../../queries/__tests__/__datasets__/booking-2707229.json'),
  },
  {
    test: config.restApiEndpoint.allBookings +
      '/2707224\\?simple_token=[0-9a-f-]{36}',
    data: require('../../queries/__tests__/__datasets__/booking-2707224.json'),
  },
];

/**
 * @deprecated
 */
const mocksMap = {
  [config.restApiEndpoint
    .allBookings]: require('../../queries/__tests__/__datasets__/AllBookings.json'),
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
  })]: require(`../../queries/__tests__/__datasets__/AllFlights.prague-mexico.json`),
  [config.restApiEndpoint.allFlights({
    flyFrom: 'prague_cz',
    to: 'MEX',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  })]: require(`../../queries/__tests__/__datasets__/AllFlights.json`),
  [config.restApiEndpoint.airlines]: require('../../dataLoaders/__tests__/__datasets__/airlines.json'),
  [config.restApiEndpoint.allLocations({ term: 'Prague'})]: require('../../queries/__tests__/__datasets__/AllLocations.prague.json'),
  [config.restApiEndpoint.allLocations({ term: 'unknown place'})]: [], // empty array
  [config.restApiEndpoint.allLocations({ term: 'Prague'})]:
    require('../../queries/__tests__/__datasets__/AllLocations.prague.json'),
  [config.restApiEndpoint.allLocations({ term: 'Mexico'})]:
    require('../../queries/__tests__/__datasets__/AllLocations.mexico.json'),
};
/* eslint-enable */

export default function request(absoluteApiUrl: string): Promise<Object> {
  const mockResponse = stackOfMockResponses.GET[absoluteApiUrl];
  if (mockResponse !== undefined) {
    return mockResponse;
  }

  // backward compatibility
  const element = mocksRegexpMap.find(element => {
    const regexp = new RegExp(`^${element.test}$`);
    return regexp.test(absoluteApiUrl);
  });
  if (element !== undefined) {
    return new Promise(resolve => {
      resolve(element.data);
    });
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
    return mockResponse;
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
