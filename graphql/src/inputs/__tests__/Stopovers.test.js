// @flow

import Stopovers from '../Stopovers';

it('Stopovers type should have valid fields', () => {
  expect(Stopovers.getFields()).toMatchSnapshot();
});
