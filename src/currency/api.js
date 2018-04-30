// @flow

import { get } from '../common/services/HttpRequest';
import type { CurrencyDetails } from './CurrencyDetail';

export const getCurrencies = (): Promise<CurrencyDetails> =>
  get('https://nitro-hankey.skypicker.com/currencies');
