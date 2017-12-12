// @flow

import FlightsOptionsInput from '../../flight/types/inputs/FlightsOptionsInput';

it('FlightsOptionsInput type should have valid fields', () => {
  expect(FlightsOptionsInput.getFields()).toMatchSnapshot();
});
