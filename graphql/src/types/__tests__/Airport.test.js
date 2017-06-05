// @flow

import Airport from '../Airport';

it('Airport type should have valid fields', () => {
  expect(Airport.getFields()).toMatchSnapshot();
});
