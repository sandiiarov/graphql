// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import AllHotelsDataset from '../../datasets/all.json';

beforeEach(() => {
  RestApiMock.onGet(
    'https://hotels-api.skypicker.com/api/hotels?output=hotel_details&hotel_ids=25215&checkin=2018-11-16&checkout=2018-11-23&room1=A',
  ).replyWithData(AllHotelsDataset);
});

describe('single hotel availability query', () => {
  it('should work for full query', async () => {
    expect(
      await graphql(`
        {
          availableHotel(
            search: {
              hotelId: "SG90ZWxBdmFpbGFiaWxpdHk6MjUyMTU=" # HotelAvailability:25215
              checkin: "2018-11-16"
              checkout: "2018-11-23"
              roomsConfiguration: { adultsCount: 1 }
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
