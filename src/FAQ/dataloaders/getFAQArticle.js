// @flow

import Dataloader from 'dataloader/index';
import { get } from '../../common/services/HttpRequest';
import Config from '../../../config/application';
import ISOLocalesToLanguage from '../../common/types/enums/ISOLocalesToLanguage';

type NotFound = {|
  detail: string,
|};
type ValidResponse = {
  id: number,
  content: string,
  title: string,
  perex: string,
  upvotes: number,
  downvotes: number,
};
type APIResponse = NotFound | ValidResponse;

export type FAQArticleDetail = ValidResponse & {
  language: $Values<typeof ISOLocalesToLanguage>,
};

export type Args = {|
  originalId: string,
|};

const getFAQArticle = async (
  originalId: string,
  language: $Values<typeof ISOLocalesToLanguage>,
): Promise<FAQArticleDetail> => {
  const url = Config.restApiEndpoint.FAQArticle(originalId);
  const article: APIResponse = await get(url, null, {
    'Accept-Language': language,
  });

  if (!article || article.detail) {
    throw new Error(`Article with id ${originalId} was not found.`);
  }

  return {
    ...article,
    language,
  };
};

const batchLoad = async (
  inputs: $ReadOnlyArray<Args>,
  language: $Values<typeof ISOLocalesToLanguage>,
): Promise<Array<FAQArticleDetail>> => {
  const promises = inputs.map(({ originalId }: Args) =>
    getFAQArticle(originalId, language),
  );

  return Promise.all(promises);
};

export default function createFAQLoader(
  language: $Values<typeof ISOLocalesToLanguage>,
) {
  return new Dataloader(queries => batchLoad(queries, language));
}
