// @flow

import FlightsOptionsInput from '../FlightsOptionsInput';

it('FlightsOptionsInput type should have valid fields', () => {
  expect(FlightsOptionsInput.getFields()).toMatchSnapshot();
});
