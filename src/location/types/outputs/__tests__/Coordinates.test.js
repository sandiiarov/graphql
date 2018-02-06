// @flow

import Coordinates from '../Coordinates';

it('Coordinates have valid fields', () => {
  expect(Coordinates.getFields()).toMatchSnapshot();
});
