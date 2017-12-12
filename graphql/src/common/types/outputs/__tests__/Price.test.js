// @flow

import Price from '../Price';

it('Price type should have valid fields', () => {
  expect(Price.getFields()).toMatchSnapshot();
});
