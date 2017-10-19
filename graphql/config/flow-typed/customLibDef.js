// @flow

// see: https://flow.org/en/docs/libdefs/creation/

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void,
  },
};

declare module 'dataloader' {
  declare class DataLoader<K, V> {
    constructor(
      batchLoader: (keys: Array<K>) => Promise<Array<Error | V>>,
      options?: {
        batch?: boolean,
        maxBatchSize?: number,
        cache?: boolean,
        cacheKeyFn?: (key: any) => any,
        cacheMap?: {
          get(key: K): Promise<V> | void,
          set(key: K, value: Promise<V>): any,
          delete(key: K): any,
          clear(): any,
        },
      },
    ): void,
    load(key: K): Promise<V>,
    loadMany(keys: Array<K>): Promise<Array<V>>,
    clear(key: K): this,
    clearAll(): this,
    prime(key: K, value: V): this,
  }
  declare var exports: typeof DataLoader;
}
