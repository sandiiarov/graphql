// @flow

import {
  connectionArgs,
  connectionFromArray,
  connectionDefinitions,
} from 'graphql-relay';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import FAQCategory from './../types/outputs/FAQCategory';
import LanguageInput from '../../common/types/inputs/LanguageInput';

const { connectionType: FaqCategoriesConnection } = connectionDefinitions({
  nodeType: FAQCategory,
});

export default {
  type: FaqCategoriesConnection,
  description: 'Retrieve list of FAQ categories.',
  args: {
    language: {
      type: LanguageInput,
      description:
        'Language in which the titles and perexes of FAQ categories are returned.',
    },
    ...connectionArgs,
  },
  resolve: async (
    ancestor: mixed,
    { language, ...args }: Object,
    { dataLoader }: GraphqlContextType,
  ) => {
    const results = await dataLoader.FAQCategories.load({
      language,
    });
    return connectionFromArray(results, args);
  },
};
