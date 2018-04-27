// @flow

import { GraphQLEnumType } from 'graphql';
import languages from './languages';

const deprecationReason =
  'Use "Accept-Language" HTTP header to specify locale.';

export default new GraphQLEnumType({
  name: 'Language',
  values: Object.keys(languages).reduce((memo, key) => {
    const value = languages[key];
    memo[key] = { ...value, deprecationReason };

    return memo;
  }, {}),
  description: deprecationReason,
});
