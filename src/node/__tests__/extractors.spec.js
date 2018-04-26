// @flow

import { toGlobalId } from 'graphql-relay';

import * as extractors from '../extractors';
import currencyType from '../../currency/types/outputs/CurrencyDetail';

describe('#extractors', () => {
  test("load type 'CurrencyDetail'", () => {
    const load = jest.fn().mockReturnValue('promise');

    const id = toGlobalId('CurrencyDetail', 'kek');
    const ctx = { dataLoader: { currency: { load } } };

    // $FlowAllowMockMagic
    const res = extractors.loadType(id, ctx);

    expect(load).toBeCalledWith('kek');
    expect(res).toBe('promise');
  });

  test("load type 'default'", () => {
    const id = toGlobalId('__UNKNOWN__', 'kek');

    // $FlowAllowMockMagic
    const res = extractors.loadType(id, {});

    expect(res).toBeNull();
  });

  test("detect type 'CurrencyDetail'", () => {
    const res = extractors.detectType({ rate: 1337 });

    expect(res).toBe(currencyType);
  });

  test("detect type 'default'", () => {
    const res = extractors.detectType({});

    expect(res).toBeNull();
  });
});
