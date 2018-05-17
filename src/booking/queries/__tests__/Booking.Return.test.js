// @flow

import config from '../../../../config/application';
import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import booking from '../../datasets/booking-item-return-3222550.json';

beforeEach(() => {
  RestApiMock.onGet(config.restApiEndpoint.allBookings).replyWithData([
    booking,
  ]);
});

describe('single booking query with return flight', () => {
  it('should return details about both outbound & inbound trips', async () => {
    const query = `{
      booking(id: 3222550) {
        type
        return {
          destinationImageUrl
          directAccessURL
          outbound {
            departure {
              time
            }
            arrival {
              time
            }
            duration
          }
          inbound {
            departure {
              time
            }
            arrival {
              time
            }
            duration
          }
        }
        oneWay {
          id
        }
        multicity {
          id
        }
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
