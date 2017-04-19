// @flow

export type GraphqlContextType = {
  apiToken: string,
};

export function createContext(token: string): GraphqlContextType {
  return {
    apiToken: token,
  };
}
