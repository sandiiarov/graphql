// @flow

import Location from '../../location/types/outputs/Location';

it('Location type should have valid fields', () => {
  expect(Location.getFields()).toMatchSnapshot();
});
