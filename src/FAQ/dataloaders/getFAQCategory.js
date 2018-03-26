// @flow

import Dataloader from 'dataloader';
import Config from '../../../config/application';
import { get } from '../../common/services/HttpRequest';
import type { FAQCategoryType } from '../types/outputs/FAQCategory';
import type {
  RawFAQArticleItem,
  SanitizedFAQArticleItem,
} from '../types/FAQArticle';

export type Args = {
  language: string,
};

const FAQ_MENU_CATEGORY = 'menu';

const listFAQ = async (language: string): Promise<FAQCategoryType[]> => {
  const rootCategories = await get(
    Config.restApiEndpoint.allFAQCategories(),
    null,
    {
      'Accept-Language': language,
    },
  );
  const rootCategory = (rootCategories || []).find(
    c => c.title === FAQ_MENU_CATEGORY,
  );
  const rootCategoryId = rootCategory && rootCategory.tree_id;

  if (!rootCategoryId) {
    return [];
  }

  const categories = await get(
    Config.restApiEndpoint.allFAQCategories(rootCategoryId),
    null,
    {
      'Accept-Language': language,
    },
  );

  return categories.map(sanitizeCategory(language));
};

const batchLoad = async (categories: $ReadOnlyArray<Args>) => {
  const promises = categories.map(({ language }: Args) => listFAQ(language));

  return Promise.all(promises);
};

const sanitizeCategory = (language: string) => category => ({
  id: category.id,
  title: category.title,
  subcategories: category.childrens
    ? category.childrens.map(sanitizeCategory(language))
    : [],
  FAQs: category.articles
    ? category.articles.map(sanitizeArticle(language))
    : [],
});

const sanitizeArticle = (language: string) => {
  return (article: RawFAQArticleItem): SanitizedFAQArticleItem => {
    // Currently "id" field itself is missing in "/categories/:id" endpoint, necessary to get out of an url
    let id = null;

    const matches = article.url && article.url.match(/(\d+)$/);
    if (matches && matches[0] && typeof matches[0] === 'string') {
      id = matches[0];
    }

    if (!id) {
      throw new Error('Error: id field not extracted from url');
    }

    return {
      id,
      language,
      ...article,
    };
  };
};

export default function createFAQLoader() {
  return new Dataloader(queries => batchLoad(queries));
}
