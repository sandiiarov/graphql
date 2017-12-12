// @flow

import CabinBaggage from '../../booking/types/outputs/Baggage';

it('AllowedBaggage type should have valid fields', () => {
  expect(CabinBaggage.getFields()).toMatchSnapshot();
});
