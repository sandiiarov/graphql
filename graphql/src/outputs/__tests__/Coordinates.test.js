// @flow

import Coordinates from '../../location/types/outputs/Coordinates';

it('Coordinates have valid fields', () => {
  expect(Coordinates.getFields()).toMatchSnapshot();
});
