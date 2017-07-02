// @flow

import RadiusInput from '../RadiusInput';

it('RadiusInput type should have valid fields', () => {
  expect(RadiusInput.getFields()).toMatchSnapshot();
});
