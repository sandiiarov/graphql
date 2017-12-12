// @flow

import LocationArea from '../../location/types/outputs/LocationArea';

it('LocationArea type should have valid fields', () => {
  expect(LocationArea.getFields()).toMatchSnapshot();
});
