// @flow

import { toGlobalId } from '../../../common/services/OpaqueIdentifier';

import {
  graphql,
  BookingComApiMock,
} from '../../../common/services/TestingTools';
import SingleHotelDataset from '../../datasets/25215.json';
import SingleHotelBeddingsDataset from '../../datasets/25215Bedding.json';

it('works with full query', async () => {
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/2.0/json/hotels?extras=hotel_info%2Chotel_photos%2Chotel_description%2Chotel_facilities%2Cpayment_details%2Croom_info%2Croom_photos%2Croom_description%2Croom_facilities&hotel_ids=25215',
  ).replyWithData(SingleHotelDataset);
  BookingComApiMock.onGet(
    'https://distribution-xml.booking.com/json/bookings.getRooms?hotel_ids=25215',
  ).replyWithData(SingleHotelBeddingsDataset);

  expect(
    await graphql(
      `
        query($id: ID!) {
          hotel(id: $id) {
            id
            originalId
            name
            cityName
            whitelabelUrl
            summary
            mainPhoto {
              id
              lowResUrl
              highResUrl
              thumbnailUrl
            }
            coordinates {
              lat
              lng
            }
            address {
              street
              city
              zip
            }
            rating {
              stars
              categoryName
            }
            review {
              score
              description
              count
            }
            facilities(first: 2) {
              edges {
                cursor
                node {
                  id
                  name
                }
              }
            }
            rooms(first: 2) {
              edges {
                cursor
                node {
                  id
                  type
                  maxPersons
                  bedding {
                    type
                    amount
                  }
                  photos(first: 2) {
                    edges {
                      cursor
                      node {
                        id
                        lowResUrl
                        highResUrl
                        thumbnailUrl
                      }
                    }
                  }
                  description {
                    title
                    text
                  }
                }
              }
            }
            photos(first: 2) {
              edges {
                cursor
                node {
                  id
                  lowResUrl
                  highResUrl
                  thumbnailUrl
                }
              }
            }
          }
        }
      `,
      {
        id: toGlobalId('hotel', '25215'),
      },
    ),
  ).toMatchSnapshot();
});
