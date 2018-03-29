// @flow

import { GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import type { FAQArticleResponse } from './../FAQArticle';
import { globalIdField } from '../../../common/services/OpaqueIdentifier';

export type FAQArticleType = {|
  id: number,
  title: string,
  perex: string,
  content: string,
  upvotes: number,
  downvotes: number,
|};

export default new GraphQLObjectType({
  name: 'FAQArticle',
  fields: {
    id: globalIdField('FAQArticle', ({ id }: FAQArticleResponse) => id),
    title: {
      type: GraphQLString,
      description: 'Title of the article',
      resolve: ({ title }: FAQArticleResponse): string => title,
    },
    perex: {
      type: GraphQLString,
      description: 'Perex of the article',
      resolve: ({ perex }: FAQArticleResponse): string => perex,
    },
    content: {
      type: GraphQLString,
      description: 'Content of the article',
      resolve: async (
        { language, id }: FAQArticleResponse,
        args: Object,
        { dataLoader }: GraphqlContextType,
      ): Promise<string> => {
        const article = await dataLoader.FAQArticle.load({
          originalId: id,
          language,
        });
        return article.content;
      },
    },
    upvotes: {
      type: GraphQLInt,
      description: 'Upvotes about the utility of the article',
      resolve: ({ upvotes }: FAQArticleResponse): number => upvotes,
    },
    downvotes: {
      type: GraphQLInt,
      description: 'Downvotes about the utility of the article',
      resolve: ({ downvotes }: FAQArticleResponse): number => downvotes,
    },
  },
});
