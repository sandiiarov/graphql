// @flow

import url from 'url';

/**
 * Although API contains several FAQ trees, this is currently the only relevant tree.
 * Others may include testing data or the ones not intended for displaying
 */
const FAQ_CATEGORY_ID = '3';

export default {
  restApiEndpoint: {
    allBookings:
      'https://booking-api.skypicker.com/api/v0.1/users/self/bookings',
    singleBooking: (bookingId: number, simpleToken: string) =>
      queryWithParameters(
        `https://booking-api.skypicker.com/api/v0.1/users/self/bookings/${bookingId}`,
        {
          simple_token: simpleToken,
        },
      ),
    allFlights: (queryParameters: ?Object = null) =>
      queryWithParameters('https://api.skypicker.com/flights', {
        ...queryParameters,
        v: 3,
      }),
    login: 'https://auth.skypicker.com/v1/user.login',
    identity: 'https://auth.skypicker.com/v1/user.get',
    airlines: 'https://api.skypicker.com/airlines?v=2',
    allLocations: (queryParameters: Object) =>
      queryWithParameters(
        'https://api.skypicker.com/locations',
        queryParameters,
      ),
    rates: 'https://api.skypicker.com/rates',
    allFAQ: (search: string) =>
      queryWithParameters(
        'https://api.skypicker.com/knowledgebase/api/v1/search',
        { q: search, autocomplete: true, tree_ids: FAQ_CATEGORY_ID },
      ),
    allFAQCategories: () =>
      `https://api.skypicker.com/knowledgebase/api/v1/categories/${FAQ_CATEGORY_ID}`,
    FAQArticle: (faqArticleId: string) => {
      return `https://api.skypicker.com/knowledgebase/api/v1/articles/${faqArticleId}`;
    },
    FAQArticleComment: (faqArticleId: string) =>
      `https://api.skypicker.com/knowledgebase/api/v1/articles/${faqArticleId}/comment`,
  },
  auth: {
    basicToken: String(process.env.AUTH_BASIC_TOKEN),
    digest: String(process.env.AUTH_DIGEST),
  },
};

export function queryWithParameters(
  absoluteUrl: string,
  queryParameters: ?Object = null,
) {
  const urlObject = url.parse(absoluteUrl, true);
  // intentional ==, can be null or undefined
  if (queryParameters != null) {
    urlObject.query = filterParameters(queryParameters);
  }
  return url.format(urlObject);
}

function filterParameters(parameters: Object) {
  const filteredParameters = parameters;
  Object.keys(parameters).forEach(key => {
    const val = parameters[key];
    if (val === null || val === undefined || val === '') {
      delete filteredParameters[key];
      return;
    }

    if (Array.isArray(val)) {
      filteredParameters[key] = val.toString();
    }

    if (typeof val === 'string') {
      filteredParameters[key] = val.trim();
    }
  });
  return filteredParameters;
}
