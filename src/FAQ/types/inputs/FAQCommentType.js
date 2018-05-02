// @flow

import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'FAQCommentType',
  values: {
    CONFUSING: { value: 'confusing' },
    DOESNT_ANSWER: { value: 'doesntAnswer' },
    DONT_LIKE: { value: 'dontLike' },
    NOT_ACCURATE: { value: 'notAccurate' },
    OTHER: { value: 'other' },
  },
});
