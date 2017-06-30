// @flow

import DateFromInput from '../DateFromInput';

it('DateFromInput have valid fields', () => {
  expect(DateFromInput.getFields()).toMatchSnapshot();
});
