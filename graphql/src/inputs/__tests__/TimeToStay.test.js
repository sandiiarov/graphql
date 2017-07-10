// @flow

import TimeToStay from '../TimeToStay';

it('TimeToStay have valid fields', () => {
  expect(TimeToStay.getFields()).toMatchSnapshot();
});
