// @flow

import PassengersInput from '../../flight/types/inputs/PassengersInput';

it('PassengersInput type should have valid fields', () => {
  expect(PassengersInput.getFields()).toMatchSnapshot();
});
