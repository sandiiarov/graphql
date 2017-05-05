// @flow

export type GraphqlContextType = {
  apiToken: null | string,
};

export function createContext(token: null | string): GraphqlContextType {
  return {
    apiToken: token,
  };
}
