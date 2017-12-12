// @flow

import FlightsSearchInput from '../../flight/types/inputs/FlightsSearchInput';

it('FlightsSearchInput type should have valid fields', () => {
  expect(FlightsSearchInput.getFields()).toMatchSnapshot();
});
