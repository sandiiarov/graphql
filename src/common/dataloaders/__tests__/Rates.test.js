// @flow

import { RestApiMock } from '../../services/TestingTools';
import config from '../../../../config/application';
import RatesDataset from '../../datasets/rates.json';
import createRatesLoader from '../Rates';

RestApiMock.onGet(config.restApiEndpoint.rates).replyWithData(RatesDataset);

describe('Rates dataloader', () => {
  it('should load rate', async () => {
    const ratesLoader = createRatesLoader();
    const rate = await ratesLoader.load('CZK');
    expect(rate).toBe(0.03815);
  });

  it('should load null for unknown currency', async () => {
    const ratesLoader = createRatesLoader();
    const rate = await ratesLoader.load('NONE');
    expect(rate).toBe(null);
  });
});
