// @flow

import {
  graphql,
  BookingComApiMock,
} from '../../../common/services/TestingTools';
import AllHotelsDataset from '../../datasets/all.json';

beforeEach(() => {
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotelAvailability?extras=hotel_details&order_by=popularity&hotel_ids=25215&checkin=2018-11-16&checkout=2018-11-23&language=es&room1=A',
  ).replyWithData(AllHotelsDataset);
});

describe('single hotel availability query', () => {
  it('should work for full query', async () => {
    expect(
      await graphql(`
        {
          availableHotel(
            search: {
              hotelId: "aG90ZWw6MjUyMTU=" # hotel:25215
              checkin: "2018-11-16"
              checkout: "2018-11-23"
              roomsConfiguration: { adultsCount: 1 }
              language: es
            }
          ) {
            id
            price {
              amount
              currency
            }
          }
        }
      `),
    ).toMatchSnapshot();
  });
});
