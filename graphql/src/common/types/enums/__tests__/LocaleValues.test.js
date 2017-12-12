// @flow

import LocaleValues from '../LocaleValues';

it('LocaleValues should be properly generated from LocaleMap', () => {
  expect(LocaleValues).toMatchSnapshot();
});
