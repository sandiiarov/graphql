// @flow

import CoordinatesInput from '../CoordinatesInput';

it('CoordinatesInput type should have valid fields', () => {
  expect(CoordinatesInput.getFields()).toMatchSnapshot();
});
