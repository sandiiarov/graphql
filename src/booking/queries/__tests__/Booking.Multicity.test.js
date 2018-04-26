// @flow

import config from '../../../../config/application';
import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import booking from '../../datasets/booking-item-multicity-4903131.json';

beforeEach(() => {
  RestApiMock.onGet(config.restApiEndpoint.allBookings).replyWithData([
    booking,
  ]);
});

describe('single booking query with multicity', () => {
  it('should return multicity details', async () => {
    const query = `{
      booking(id: 4903131) {
        type
        multicity {
          trips {
            departure {
              localTime
            }
            arrival {
              localTime
            }
            legs {
              departure {
                localTime
              }
              arrival {
                localTime
              }
            }
          }
        }
        oneWay {
          id
        }
        return {
          id
        }
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
