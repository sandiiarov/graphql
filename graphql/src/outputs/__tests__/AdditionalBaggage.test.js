// @flow

import AdditionalBaggage from '../AdditionalBaggage';

it('AdditionalBaggage type should have valid fields', () => {
  expect(AdditionalBaggage.getFields()).toMatchSnapshot();
});
