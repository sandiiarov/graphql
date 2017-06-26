// @flow

import DateRangeInput from '../DateRangeInput';

it('DateRangeInput have valid fields', () => {
  expect(DateRangeInput.getFields()).toMatchSnapshot();
});
