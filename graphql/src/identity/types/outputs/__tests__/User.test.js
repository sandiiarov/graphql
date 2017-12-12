// @flow

import User from '../User';

it('should have fields defined', () => {
  expect(User.getFields()).toMatchSnapshot();
});
