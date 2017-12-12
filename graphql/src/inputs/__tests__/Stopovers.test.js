// @flow

import Stopovers from '../../flight/types/inputs/Stopovers';

it('Stopovers type should have valid fields', () => {
  expect(Stopovers.getFields()).toMatchSnapshot();
});
