// @flow

import Dataloader from 'dataloader';
import { get } from '../../common/services/HttpRequest';
import Config from '../../../config/application';

export type Args = {|
  search: string,
|};

type RawArticle = {|
  id: number,
  title: string,
  content: string,
  downvotes: number,
  upvotes: number,
  categories: Array<{|
    tree_id: number,
    tree_name: string,
    items: [],
  |}>,
|};

export type ArticleFromSearch = {|
  id: number,
  title: string,
  perex: string,
  downvotes: number,
  upvotes: number,
  language: string,
|};

const sanitizeArticle = (language: string) => {
  return (rawArticle: RawArticle): ArticleFromSearch => {
    return {
      id: rawArticle.id,
      title: rawArticle.title,
      perex: rawArticle.content,
      downvotes: rawArticle.downvotes,
      upvotes: rawArticle.upvotes,
      language,
    };
  };
};

async function fetchFAQ(search: string, language: string) {
  const articles = await get(Config.restApiEndpoint.allFAQ(search), null, {
    'Accept-Language': language,
  });

  return articles.map(sanitizeArticle(language));
}

async function batchLoad(searches: $ReadOnlyArray<Args>, language: string) {
  const promises = searches.map(({ search }: Args) =>
    fetchFAQ(search, language),
  );

  return Promise.all(promises);
}

export default function createFAQLoader(language: string) {
  return new Dataloader(queries => batchLoad(queries, language));
}
