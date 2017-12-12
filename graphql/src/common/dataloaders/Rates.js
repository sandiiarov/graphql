// @flow

import DataLoader from 'dataloader';
import { get } from '../../services/HttpRequest';
import Config from '../../../config/application';

let ratesCache = null;

export default function createRatesLoader() {
  ratesCache = null;
  return new DataLoader((currencyCode: Array<string>) =>
    batchLoad(currencyCode),
  );
}

async function batchLoad(currencyCodes): Promise<Array<?number | Error>> {
  const rates = await fetchRates();
  return currencyCodes.map(currencyCode => {
    const rate = rates[currencyCode];
    return rate !== undefined ? rate : null;
  });
}

async function fetchRates() {
  if (!ratesCache) {
    ratesCache = get(Config.restApiEndpoint.rates);
  }
  return ratesCache;
}
