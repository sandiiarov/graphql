// @flow

import Leg from '../../flight/types/outputs/Leg';

it('Leg type should have valid fields', () => {
  expect(Leg.getFields()).toMatchSnapshot();
});
