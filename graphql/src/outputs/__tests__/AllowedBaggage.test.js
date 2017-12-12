// @flow

import AllowedBaggage from '../../booking/types/outputs/AllowedBaggage';

it('AllowedBaggage type should have valid fields', () => {
  expect(AllowedBaggage.getFields()).toMatchSnapshot();
});
