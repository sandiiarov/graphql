// @flow

import Booking from '../../booking/types/outputs/Booking';

it('Booking type should have valid fields', () => {
  expect(Booking.getFields()).toMatchSnapshot();
});
