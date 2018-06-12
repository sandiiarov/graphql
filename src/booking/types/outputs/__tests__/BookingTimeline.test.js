// @flow

import BookingTimeline from '../BookingTimeline';

it('BookingTimeline type should have valid fields', () => {
  expect(BookingTimeline.getFields()).toMatchSnapshot();
});
