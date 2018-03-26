// @flow

import Dataloader from 'dataloader/index';
import { get } from '../../common/services/HttpRequest';
import Config from '../../../config/application';
import type { FAQArticleDetail } from '../types/FAQArticle';

export type Args = {
  language: string,
  originalId: string,
};

const getFAQArticle = async (
  originalId: string,
  language: string,
): Promise<FAQArticleDetail> => {
  return get(Config.restApiEndpoint.FAQArticle(originalId), null, {
    'Accept-Language': language,
  });
};

const batchLoad = async (
  inputs: $ReadOnlyArray<Args>,
): Promise<Array<FAQArticleDetail>> => {
  const promises = inputs.map(({ originalId, language }: Args) =>
    getFAQArticle(originalId, language),
  );

  return Promise.all(promises);
};

export default function createFAQLoader() {
  return new Dataloader(queries => batchLoad(queries));
}
