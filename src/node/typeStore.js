// @flow

import type { GraphQLObjectType } from 'graphql';

/**
 * The sole purpose of the file is avoiding circular dependencies.
 * See https://github.com/graphql/graphql-relay-js/issues/113
 */

type Types = {
  Currency: ?GraphQLObjectType,
};

const types: Types = {
  Currency: null,
};

export function register(type: string, value: GraphQLObjectType) {
  types[type] = value;
}

export function getType(type: string): ?GraphQLObjectType {
  return types[type];
}
