// @flow

import Flight from '../Flight';

it('Flight type should have valid fields', () => {
  expect(Flight.getFields()).toMatchSnapshot();
});
