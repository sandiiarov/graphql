// @flow

import Dataloader from 'dataloader';
import { get } from '../../common/services/HttpRequest';
import Config from '../../../config/application';
import { sanitizeFAQ } from './ApiSanitizer';

export type Args = {
  search: string,
  language: string,
};

async function fetchFAQ(search: string, language: string) {
  return await get(Config.restApiEndpoint.allFAQ({ q: search }), null, {
    'Accept-Language': language,
  });
}

export default function createFAQLoader() {
  return new Dataloader(queries => batchLoad(queries));
}

async function batchLoad(searches: $ReadOnlyArray<Args>) {
  const promises = searches.map(({ search, language }: Args) =>
    fetchFAQ(search, language),
  );
  const responses = await Promise.all(promises);

  return responses.map(results => {
    return results.map(result => sanitizeFAQ(result));
  });
}
