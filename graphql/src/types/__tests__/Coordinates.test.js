// @flow

import Coordinates from '../Coordinates';

it('Coordinates type should have valid fields', () => {
  expect(Coordinates.getFields()).toMatchSnapshot();
});
