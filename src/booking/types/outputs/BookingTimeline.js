// @flow

import { GraphQLObjectType, GraphQLList } from 'graphql';

import GraphQLBookingTimelineEvent from './BookingTimelineEvent';

import type {
  BookingTimelineData,
  BookingTimelineEvent,
} from '../../BookingTimeline';

export default new GraphQLObjectType({
  name: 'BookingTimeline',
  fields: {
    events: {
      type: new GraphQLList(GraphQLBookingTimelineEvent),
      description: 'List of events of the Bookingtimeline',
      resolve: ({
        events,
      }: BookingTimelineData): $ReadOnlyArray<BookingTimelineEvent> => events,
    },
  },
});
