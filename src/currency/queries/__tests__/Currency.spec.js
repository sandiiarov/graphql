// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import currenciesDataset from '../../datasets/currencies.json';

beforeEach(() => {
  RestApiMock.onGet(
    'https://nitro-hankey.skypicker.com/currencies',
  ).replyWithData(currenciesDataset);
});

describe('Currency', () => {
  test('getting a currency', async () => {
    const resultsQuery = `{
      currency(code: "amd") {
        id
        code
        name
        format
        uncertainFormat
        round
        enabledOnAffilId
        fallback
        rate
      }
    }`;

    expect(await graphql(resultsQuery)).toMatchSnapshot();
  });

  test('getting a non-existent currency', async () => {
    const resultsQuery = `{
      currency(code: "kek") {
        id
        code
        name
        format
        uncertainFormat
        round
        enabledOnAffilId
        fallback
        rate
      }
    }`;

    expect(await graphql(resultsQuery)).toMatchSnapshot();
  });
});
