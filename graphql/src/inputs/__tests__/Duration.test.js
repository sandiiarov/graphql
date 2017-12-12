// @flow

import Duration from '../../flight/types/inputs/Duration';

it('Duration type should have valid fields', () => {
  expect(Duration.getFields()).toMatchSnapshot();
});
