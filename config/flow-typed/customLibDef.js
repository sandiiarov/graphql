// @flow

// see: https://flow.org/en/docs/libdefs/creation/

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void,
  },
};
