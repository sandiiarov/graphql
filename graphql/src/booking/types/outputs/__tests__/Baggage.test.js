// @flow

import CabinBaggage from '../Baggage';

it('AllowedBaggage type should have valid fields', () => {
  expect(CabinBaggage.getFields()).toMatchSnapshot();
});
