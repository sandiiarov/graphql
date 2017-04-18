import { graphql } from 'graphql';
import schema from '../Schema';
import { createContext } from '../services/GraphqlContext';

jest.mock('../services/HttpRequest');

export const executeQuery = async (query: string): Promise<Object> =>
  graphql(schema, query, null, createContext('test_token'));
