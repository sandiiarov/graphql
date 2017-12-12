// @flow

import PassengerInput from '../../flight/types/inputs/PassengerInput';

it('PassengerInput type should have valid fields', () => {
  expect(PassengerInput.getFields()).toMatchSnapshot();
});
