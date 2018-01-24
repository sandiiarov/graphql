// @flow

import {
  graphql,
  BookingComApiMock,
} from '../../../common/services/TestingTools';
import AllHotelsDataset from '../../datasets/all.json';

beforeEach(() => {
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotelAvailability?extras=hotel_details&order_by=popularity&radius=50&latitude=51.5&longitude=0&checkin=2017-11-16&checkout=2017-11-23&rows=2&min_review_score=8&room1=A',
  ).replyWithData(AllHotelsDataset);
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotelAvailability?extras=hotel_details&order_by=popularity&radius=50&latitude=51.5&longitude=0&checkin=2017-11-16&checkout=2017-11-23&rows=2&room1=A',
  ).replyWithData(AllHotelsDataset);
});

const query = `
  query($minScore: Int) {
    allAvailableHotels(
      search: {
        latitude: 51.5
        longitude: 0
        checkin: "2017-11-16"
        checkout: "2017-11-23"
        roomsConfiguration: [{ adultsCount: 1 }]
      }
      filter: { minScore: $minScore }
      first: 2
    ) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

describe('all hotels query', () => {
  it('should filter hotels with min score 8', async () => {
    expect(await graphql(query, { minScore: 8 })).toMatchSnapshot();
  });

  it('should not allow to set minScore out of range 1-10', async () => {
    expect(await graphql(query, { minScore: 11 })).toMatchSnapshot();
  });

  it('should allow nullable minScore', async () => {
    expect(await graphql(query, { minScore: null })).toMatchSnapshot();
  });
});
