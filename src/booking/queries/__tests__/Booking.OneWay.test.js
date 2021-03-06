// @flow

import config from '../../../../config/application';
import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import AllBookingsDataset from '../../datasets/AllBookings.json';

beforeEach(() => {
  RestApiMock.onGet(config.restApiEndpoint.allBookings).replyWithData(
    AllBookingsDataset,
  );
});

describe('single booking query with one way trip', () => {
  it('should return details just about one way trip', async () => {
    const query = `{
      booking(id: 2707251) {
        type
        oneWay {
          destinationImageUrl(dimensions: _1280x720)
          directAccessURL(deeplinkTo: REFUND)
          trip {
            departure {
              time
            }
            arrival {
              time
            }
            duration
            legs {
              duration
            }
          }
        }
        return {
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
