// @flow

import Duration from '../Duration';

it('Duration type should have valid fields', () => {
  expect(Duration.getFields()).toMatchSnapshot();
});
