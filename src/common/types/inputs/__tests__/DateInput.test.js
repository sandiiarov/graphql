// @flow

import DateInput from '../DateInput';

it('DateInput type should have valid fields', () => {
  expect(DateInput.getFields()).toMatchSnapshot();
});
