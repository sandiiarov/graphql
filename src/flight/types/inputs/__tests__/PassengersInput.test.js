// @flow

import PassengersInput from '../PassengersInput';

it('PassengersInput type should have valid fields', () => {
  expect(PassengersInput.getFields()).toMatchSnapshot();
});
