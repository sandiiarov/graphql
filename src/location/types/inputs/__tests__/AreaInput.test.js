// @flow

import AreaInput from '../AreaInput';

it('AreaInput type should have valid fields', () => {
  expect(AreaInput.getFields()).toMatchSnapshot();
});
