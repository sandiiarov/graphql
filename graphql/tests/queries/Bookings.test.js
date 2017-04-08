import { graphql } from 'graphql';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import schema from '../../src/Schema';

const arrivalsQuery = `{
  bookings {
    arrival {
      id
    }
  }
}
`;

describe('Booking Query Test', () => {
  describe('Arrival Queries', () => {
    it('should return id', async () => {
      const result = await graphql(schema, arrivalsQuery);
      expect(result).to.deep.equal({
        data: {
          bookings: [
            {
              arrival: {
                id: '{"where":{"code":"CDG","name":"Paris"},"when":0}',
              },
            },
            {
              arrival: {
                id: '{"where":{"code":"DXB","name":"Dubai"},"when":0}',
              },
            },
            {
              arrival: {
                id: '{"where":{"code":"KUF","name":"Samara"},"when":0}',
              },
            },
          ],
        },
      });
    });
  });
});
