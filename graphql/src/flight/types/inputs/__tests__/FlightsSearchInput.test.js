// @flow

import FlightsSearchInput from '../FlightsSearchInput';

it('FlightsSearchInput type should have valid fields', () => {
  expect(FlightsSearchInput.getFields()).toMatchSnapshot();
});
