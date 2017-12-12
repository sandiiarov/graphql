// @flow

import FlightsFiltersInput from '../../flight/types/inputs/FlightsFiltersInput';

it('FlightsFiltersInput type should have valid fields', () => {
  expect(FlightsFiltersInput.getFields()).toMatchSnapshot();
});
