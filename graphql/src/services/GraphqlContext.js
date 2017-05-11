// @flow

import DataLoader from 'dataloader';
import createIdentityLoader from '../dataLoaders/Identity';
import type { IdentityType } from '../Entities';

export type GraphqlContextType = {
  apiToken: null | string,
  dataLoader: {
    identity: DataLoader<string, IdentityType>,
  },
};

export function createContext(token: null | string): GraphqlContextType {
  return {
    apiToken: token,
    dataLoader: {
      identity: createIdentityLoader(),
    },
  };
}
