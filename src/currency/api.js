// @flow

import { fetchJson } from '../common/services/JsonFetcher';
import type { CurrencyDetails } from './CurrencyDetail';

export const getCurrencies = (): Promise<CurrencyDetails> =>
  fetchJson('https://nitro-hankey.skypicker.com/currencies');
