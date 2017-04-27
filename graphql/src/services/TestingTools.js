// @flow

import { graphql } from 'graphql';
import schema from '../Schema';
import { createContext } from '../services/GraphqlContext';

jest.mock('../services/HttpRequest');

export const executeQuery = async (
  query: string,
  variables: ?Object,
): Promise<Object> =>
  graphql(schema, query, null, createContext('test_token'), variables);
