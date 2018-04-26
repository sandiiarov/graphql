// @flow

import { nodeDefinitions } from 'graphql-relay';

import { loadType, detectType } from './extractors';

export const { nodeInterface, nodeField } = nodeDefinitions(
  loadType,
  detectType,
);
