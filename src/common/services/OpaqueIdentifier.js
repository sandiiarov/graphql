/**
 * @flow
 *
 * This file is wrapper around original implementation of opaque identifiers
 * in GraphQL Relay. It adds additional Flow annotations to make it less
 * fragile. Use this file instead of importing 'graphql-relay'.
 */

// eslint-disable-next-line no-restricted-imports
import {
  globalIdField as originalGlobalIdField,
  toGlobalId as originalToGlobalId,
} from 'graphql-relay';

import type { GraphQLFieldConfig, GraphQLResolveInfo } from 'graphql';

type AvailableOpaqueTypes =
  | 'hotel'
  | 'hotelFacility'
  | 'hotelRoom'
  | 'hotelPhoto'
  | 'hotelCity'
  | 'identity'
  | 'FAQArticle'
  | 'FAQCategory';

export const globalIdField = (
  typeName?: ?AvailableOpaqueTypes,
  idFetcher?: (object: any, context: any, info: GraphQLResolveInfo) => string,
): GraphQLFieldConfig<*, *> => {
  return originalGlobalIdField(typeName, idFetcher);
};

export const toGlobalId = (type: AvailableOpaqueTypes, id: string): string => {
  return originalToGlobalId(type, id);
};
