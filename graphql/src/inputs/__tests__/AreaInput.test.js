// @flow

import AreaInput from '../../location/types/inputs/AreaInput';

it('AreaInput type should have valid fields', () => {
  expect(AreaInput.getFields()).toMatchSnapshot();
});
