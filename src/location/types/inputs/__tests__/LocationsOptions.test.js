// @flow

import LocationsOptions from '../LocationsOptions';

it('LocationsOptions type should have valid fields', () => {
  expect(LocationsOptions.getFields()).toMatchSnapshot();
});
