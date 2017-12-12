// @flow

import Flight from '../../flight/types/outputs/Flight';

it('Flight type should have valid fields', () => {
  expect(Flight.getFields()).toMatchSnapshot();
});
