// @flow

import LocationInput from '../LocationInput';

it('LocationInput type should have valid fields', () => {
  expect(LocationInput.getFields()).toMatchSnapshot();
});
