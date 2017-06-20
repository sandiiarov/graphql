// @flow

import Locale from '../Locale';

it('Locale type should have valid fields', () => {
  expect(Locale.getValues()).toMatchSnapshot();
});
