// @flow

import {
  graphql,
  BookingComApiMock,
} from '../../../common/services/TestingTools';
import AllHotelsDataset from '../../datasets/all.json';
import HotelDataset from '../../datasets/25215.json';
import BlockWithOtherCurrency from '../../datasets/25215BlockWithOtherCurrency.json';

beforeEach(() => {
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotelAvailability?extras=hotel_details&order_by=popularity&hotel_ids=25215&checkin=2018-01-22&checkout=2018-01-28&currency=CZK&room1=A',
  ).replyWithData(AllHotelsDataset);
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotels?extras=hotel_info%2Chotel_photos%2Chotel_description%2Chotel_facilities%2Cpayment_details%2Croom_info%2Croom_photos%2Croom_description%2Croom_facilities&hotel_ids=25215&language=en-us',
  ).replyWithData(HotelDataset);
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/blockAvailability?detail_level=1&checkin=2018-01-22&checkout=2018-01-28&hotel_ids=25215&currency=CZK',
  ).replyWithData(BlockWithOtherCurrency);
});

describe('single hotel availability query', () => {
  it('should support currency for full query', async () => {
    const result = await graphql(`
      {
        availableHotel(
          search: {
            checkin: "2018-01-22"
            checkout: "2018-01-28"
            roomsConfiguration: [{ adultsCount: 1 }]
            hotelId: "aG90ZWw6MjUyMTU=" # hotel:25215
          }
          options: { currency: CZK }
        ) {
          price {
            amount
            currency
          }
          availableRooms {
            isBreakfastIncluded
            isRefundable
            minimalPrice {
              amount
              currency
            }
            incrementalPrice {
              amount
              currency
            }
          }
        }
      }
    `);
    expect(result).toMatchSnapshot();
    expect(
      result.data.availableHotel.availableRooms[0].minimalPrice.currency,
    ).toBe('CZK');
  });
});
