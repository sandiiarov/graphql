// @flow

import LocationInput from '../../location/types/inputs/LocationInput';

it('LocationInput type should have valid fields', () => {
  expect(LocationInput.getFields()).toMatchSnapshot();
});
