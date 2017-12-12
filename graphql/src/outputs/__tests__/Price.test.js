// @flow

import Price from '../../common/types/outputs/Price';

it('Price type should have valid fields', () => {
  expect(Price.getFields()).toMatchSnapshot();
});
