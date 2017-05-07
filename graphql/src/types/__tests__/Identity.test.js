// @flow

import Identity from '../Identity';

it('should have fields defined', () => {
  expect(Identity.getFields()).toMatchSnapshot();
});
