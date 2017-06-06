// @flow

import Location from '../Location';

it('Location type should have valid fields', () => {
  expect(Location.getFields()).toMatchSnapshot();
});
