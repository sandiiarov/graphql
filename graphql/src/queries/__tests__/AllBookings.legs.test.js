// @flow

import { executeQuery } from '../../services/TestingTools';

describe('flights query with legs', () => {
  it('should return valid array of flight legs', async () => {
    const legsQuery = `{
      allBookings {
        legs {
          id
          recheckRequired
          arrival {
            airport {
              city, code
            }
            time, localTime
          }
          departure {
            airport {
              city, code
            }
            time, localTime
          }
        }
      }
    }`;
    expect(await executeQuery(legsQuery)).toMatchSnapshot();
  });
});
