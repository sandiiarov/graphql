// @flow

import { toGlobalId } from '../../../common/services/OpaqueIdentifier';

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import SingleHotelDataset from '../../datasets/25215.json';
import HotelPhotosDataset from '../../datasets/hotelPhotos.json';
import HotelRoomPhotosDataset from '../../datasets/roomPhotos.json';
import HotelRoomDetailsDataset from '../../datasets/roomDetails.json';

// keep the URL hardcoded here so we will know if it changed unintentionally
const baseUrl = 'https://hotels-api.skypicker.com/api/';

it('works with full query', async () => {
  RestApiMock.onGet(`${baseUrl}hotelDetails?hotel_ids=25215`).replyWithData(
    SingleHotelDataset,
  );
  RestApiMock.onGet(`${baseUrl}hotelPhotos?hotel_ids=25215`).replyWithData(
    HotelPhotosDataset,
  );
  RestApiMock.onGet(
    `${baseUrl}roomPhotos?room_ids=2521507%2C2521509`,
  ).replyWithData(HotelRoomPhotosDataset);
  RestApiMock.onGet(`${baseUrl}roomDetails?hotel_ids=25215`).replyWithData(
    HotelRoomDetailsDataset,
  );

  expect(
    await graphql(
      `
        query($id: ID!) {
          hotel(id: $id) {
            id
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
