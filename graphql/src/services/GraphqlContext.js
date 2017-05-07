// @flow

import DataLoader from 'dataloader';
import IdentityLoader from '../dataLoaders/Identity';
import type { IdentityType } from '../Entities';

export type GraphqlContextType = {
  apiToken: null | string,
  dataLoader: {
    identity: DataLoader<string, IdentityType>,
  },
};

const identityLoader = new DataLoader((ids: Array<string>) => {
  return IdentityLoader()(ids);
});

export function createContext(token: null | string): GraphqlContextType {
  return {
    apiToken: token,
    dataLoader: {
      identity: identityLoader,
    },
  };
}
