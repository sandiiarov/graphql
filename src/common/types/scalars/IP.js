// @flow

import { GraphQLScalarType, Kind } from 'graphql';
import isIP from 'validator/lib/isIP';

// Exported for testing
export function maybeIP4(val: mixed) {
  if (isIP(val, 4)) {
    return val;
  }

  throw new Error('Value is not a valid IP address.');
}

const IPType = new GraphQLScalarType({
  name: 'IP',
  serialize: maybeIP4,
  parseValue: maybeIP4,
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return maybeIP4(ast.value);
    }

    return null;
  },
});

export default IPType;
