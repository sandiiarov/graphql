// @flow

import Leg from '../Leg';

it('Leg type should have valid fields', () => {
  expect(Leg.getFields()).toMatchSnapshot();
});
