// @flow

import AdditionalBaggage from '../../booking/types/outputs/AdditionalBaggage';

it('AdditionalBaggage type should have valid fields', () => {
  expect(AdditionalBaggage.getFields()).toMatchSnapshot();
});
