// @flow

import Booking from '../Booking';

it('Booking type should have valid fields', () => {
  expect(Booking.getFields()).toMatchSnapshot();
});
