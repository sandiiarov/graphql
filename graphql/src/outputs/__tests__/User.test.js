// @flow

import User from '../../identity/types/outputs/User';

it('should have fields defined', () => {
  expect(User.getFields()).toMatchSnapshot();
});
