// @flow

import PassengerInput from '../PassengerInput';

it('PassengerInput type should have valid fields', () => {
  expect(PassengerInput.getFields()).toMatchSnapshot();
});
