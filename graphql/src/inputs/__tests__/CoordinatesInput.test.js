// @flow

import CoordinatesInput from '../../location/types/inputs/CoordinatesInput';

it('CoordinatesInput type should have valid fields', () => {
  expect(CoordinatesInput.getFields()).toMatchSnapshot();
});
