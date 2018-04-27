// @flow

import { fromGlobalId } from 'graphql-relay';

import { getType } from './typeStore';
import type { GraphqlContextType } from '../common/services/GraphqlContext';

export function loadType(globalId: string, ctx: GraphqlContextType) {
  const { type, id } = fromGlobalId(globalId);

  switch (type) {
    case 'CurrencyDetail':
      return ctx.dataLoader.currency.load(id);
    default:
      return null;
  }
}

export function detectType(obj: any) {
  if (typeof obj.rate === 'number') {
    return getType('CurrencyDetail');
  }

  return null;
}
