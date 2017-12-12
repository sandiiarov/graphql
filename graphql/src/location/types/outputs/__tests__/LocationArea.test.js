// @flow

import LocationArea from '../LocationArea';

it('LocationArea type should have valid fields', () => {
  expect(LocationArea.getFields()).toMatchSnapshot();
});
