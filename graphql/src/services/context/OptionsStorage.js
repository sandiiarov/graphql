// @flow

import type { ResponsePath } from 'graphql';

export default class OptionsStorage {
  queriesOptions: Object = {};

  getOptions(path: ResponsePath): ?Object {
    return this.queriesOptions[getQueryKey(path)];
  }

  setOptions(queryKey: string | number, options: ?Object) {
    this.queriesOptions[queryKey] = options;
  }
}

/**
 * Get name of root query. Can be simple query name or label.
 */
function getQueryKey(path: ResponsePath): ?string {
  if (path === undefined) {
    return undefined;
  } else if (path.prev !== undefined) {
    return getQueryKey(path.prev);
  } else {
    return (path: Object).key;
  }
}
