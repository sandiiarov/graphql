// @flow

import RadiusInput from '../../location/types/inputs/RadiusInput';

it('RadiusInput type should have valid fields', () => {
  expect(RadiusInput.getFields()).toMatchSnapshot();
});
