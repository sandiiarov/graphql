// @flow

import DateToInput from '../DateToInput';

it('DateToInput have valid fields', () => {
  expect(DateToInput.getFields()).toMatchSnapshot();
});
