// @flow

import { graphql } from '../../services/TestingTools';
import Booking from '../Booking';

describe('single booking query', () => {
  it('should be of Booking type', () => {
    expect(Booking.type.toString()).toBe('Booking');
  });

  it('should return valid fields', async () => {
    const arrivalQuery = `{
      booking(id: 2707251) {
        arrival {
          airport { city { name }, code }
        }
        departure {
          airport { city { name }, code }
        }
        legs {
          arrival {
            airport { city { name }, code }
          }
          departure {
            airport { city { name }, code }
          }
        }
      }
    }`;
    expect(await graphql(arrivalQuery)).toMatchSnapshot();
  });
});
