// @flow

import LocationsOptions from '../../location/types/inputs/LocationsOptions';

it('LocationsOptions type should have valid fields', () => {
  expect(LocationsOptions.getFields()).toMatchSnapshot();
});
