// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import type { FAQType } from './FAQ';

export type ItemsType = {|
  id: number,
  title: string,
  icon: string,
  style: string,
|};

export type CategoryType = {|
  treeId: number,
  treeName: string,
  items: Array<ItemsType>,
|};

const GraphQLItems = new GraphQLObjectType({
  name: 'Items',
  fields: {
    id: {
      type: GraphQLInt,
      description: 'Id of the item',
      resolve: ({ id }: ItemsType): number => id,
    },
    title: {
      type: GraphQLString,
      description: 'Title of the item',
      resolve: ({ title }: ItemsType): string => title,
    },
    icon: {
      type: GraphQLString,
      description: 'Icon type of the item',
      resolve: ({ icon }: ItemsType): string => icon,
    },
    style: {
      type: GraphQLString,
      description: 'Color of the item',
      resolve: ({ style }: ItemsType): string => style,
    },
  },
});

const GraphQLCategory = new GraphQLObjectType({
  name: 'Categories',
  fields: {
    id: {
      type: GraphQLInt,
      description: 'Id of the category',
      resolve: ({ treeId }: CategoryType): number => treeId,
    },
    name: {
      type: GraphQLString,
      description: 'Name of the category',
      resolve: ({ treeName }: CategoryType): string => treeName,
    },
    items: {
      type: new GraphQLList(GraphQLItems),
      description: 'Items that belong to the category',
      resolve: ({ items }: CategoryType): Array<ItemsType> => items,
    },
  },
});

export default new GraphQLObjectType({
  name: 'Results',
  fields: {
    id: {
      type: GraphQLInt,
      description: 'Id of the article',
      resolve: ({ id }: FAQType): number => id,
    },
    title: {
      type: GraphQLString,
      description: 'Title of the article',
      resolve: ({ title }: FAQType): string => title,
    },
    content: {
      type: GraphQLString,
      description: 'Content of the article',
      resolve: ({ content }: FAQType): string => content,
    },
    upvotes: {
      type: GraphQLInt,
      description: 'Upvotes about the utility of the article',
      resolve: ({ upvotes }: FAQType): number => upvotes,
    },
    downvotes: {
      type: GraphQLInt,
      description: 'Downvotes about the utility of the article',
      resolve: ({ downvotes }: FAQType): number => downvotes,
    },
    categories: {
      type: new GraphQLList(GraphQLCategory),
      description: 'Category to which the article belongs',
      resolve: ({ categories }: FAQType): Array<CategoryType> => categories,
    },
  },
});
