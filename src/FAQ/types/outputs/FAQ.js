// @flow

import { GraphQLObjectType } from 'graphql';
import GraphQLResults, { type CategoryType } from './Results';

export type FAQType = {|
  id: number,
  title: string,
  content: string,
  downvotes: number,
  upvotes: number,
  categories: Array<CategoryType>,
|};

export default new GraphQLObjectType({
  name: 'AllFAQs',
  fields: {
    results: {
      type: GraphQLResults,
      description: 'Results of allFAQs search',
      resolve: (results: FAQType): FAQType => results,
    },
  },
});
