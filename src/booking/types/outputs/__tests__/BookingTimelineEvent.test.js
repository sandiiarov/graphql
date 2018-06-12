// @flow

import BookingTimelineEvent from '../BookingTimelineEvent';

it('BookingTimelineEvent type should have valid fields', () => {
  expect(BookingTimelineEvent.getFields()).toMatchSnapshot();
});
