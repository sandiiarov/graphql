// @flow

import { GraphQLEnumType } from 'graphql';
import LocaleValues from './LocaleValues';

export default new GraphQLEnumType({
  name: 'Locale',
  values: LocaleValues,
  description: 'Language tag in the format of the RFC 5646.',
});
