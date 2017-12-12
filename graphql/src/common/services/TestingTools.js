// @flow

import { graphql as graphqlNodeLibrary } from 'graphql';
import schema from '../../Schema';
import { createContext } from './GraphqlContext';

/**
 * TestingTools must be imported FIRST otherwise mock of HttpRequest won't work.
 */
jest.mock('../services/HttpRequest');
const mockedHttpRequest = require('./HttpRequest');

class MockResponse {
  absoluteUrl: string;
  httpMethod: string;

  constructor(httpMethod: 'GET' | 'POST', absoluteUrl: string) {
    this.httpMethod = httpMethod;
    this.absoluteUrl = absoluteUrl;
  }

  replyWithData(response: Array<Object> | Object) {
    // $FlowAllowMockMagic
    mockedHttpRequest.__setMockData(
      this.httpMethod,
      this.absoluteUrl,
      response,
    );
  }
}

export class RestApiMock {
  static onGet(absoluteUrl: string) {
    return new MockResponse('GET', absoluteUrl);
  }

  static onPost(absoluteUrl: string) {
    return new MockResponse('POST', absoluteUrl);
  }
}

export const graphql = async (
  query: string,
  variables: ?Object,
): Promise<Object> =>
  graphqlNodeLibrary(
    schema,
    query,
    null,
    createContext('test_token'),
    variables,
  );

export const evaluateResolver = (field: mixed, testValue: mixed) => {
  // $FlowAllowNextLineInThisTest (fields are possibly undefined but we assume it's fine)
  return field.resolve(testValue);
};
