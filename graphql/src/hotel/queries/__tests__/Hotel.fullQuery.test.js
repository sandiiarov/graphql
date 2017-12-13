// @flow

import { toGlobalId } from '../../../common/services/OpaqueIdentifier';

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import SingleHotelDataset from '../../datasets/19332.json';
import HotelPhotosDataset from '../../datasets/hotelPhotos.json';
import HotelRoomPhotosDataset from '../../datasets/roomPhotos.json';

// keep the URL hardcoded here so we will know if it changed unintentionally
const baseUrl = 'https://hotels-api.skypicker.com/api/';

it('works with full query', async () => {
  RestApiMock.onGet(`${baseUrl}hotelDetails?hotel_ids=19332`).replyWithData(
    SingleHotelDataset,
  );
  RestApiMock.onGet(`${baseUrl}hotelPhotos?hotel_ids=19332`).replyWithData(
    HotelPhotosDataset,
  );
  RestApiMock.onGet(
    `${baseUrl}roomPhotos?room_ids=1933201%2C1933203`,
  ).replyWithData(HotelRoomPhotosDataset);

  expect(
    await graphql(
      `
        query($id: ID!) {
          hotel(id: $id) {
            id
            price {
              amount
              currency
            }
            name
            mainPhoto {
              id
              lowResUrl
              highResUrl
              thumbnailUrl
            }
            cityName
            whitelabelUrl
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
        id: toGlobalId('hotel', '19332'),
      },
    ),
  ).toMatchSnapshot();
});
