// @flow

import DateInput from '../../common/types/inputs/DateInput';

it('DateInput type should have valid fields', () => {
  expect(DateInput.getFields()).toMatchSnapshot();
});
