import { graphql } from 'graphql';
import schema from '../../Schema';

describe('arrival query', () => {
  it('should return valid id field', async () => {
    const arrivalQuery = `{
        allBookings {
          arrival {
            id
          }
        }
      }`;
    const result = await graphql(schema, arrivalQuery);
    expect(result).toMatchSnapshot();
  });
});

describe('departure query', () => {
  it('should return valid id field', async () => {
    const departureQuery = `{
        allBookings {
          departure {
            id
          }
        }
      }`;
    const result = await graphql(schema, departureQuery);
    expect(result).toMatchSnapshot();
  });
});
