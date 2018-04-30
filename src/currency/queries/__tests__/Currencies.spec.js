// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import currenciesDataset from '../../datasets/currencies.json';

beforeEach(() => {
  RestApiMock.onGet(
    'https://nitro-hankey.skypicker.com/currencies',
  ).replyWithData(currenciesDataset);
});

describe('Currencies', () => {
  test('getting all currencies', async () => {
    const resultsQuery = `{
      currencies {
        edges {
          node {
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
        }
      }
    }`;

    expect(await graphql(resultsQuery)).toMatchSnapshot();
  });
});
