// @flow

import AllowedBaggage from '../AllowedBaggage';

it('AllowedBaggage type should have valid fields', () => {
  expect(AllowedBaggage.getFields()).toMatchSnapshot();
});
