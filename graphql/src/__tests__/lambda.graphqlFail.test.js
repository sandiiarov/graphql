import { graphql } from '../lambda';
import event from './lambdaProxyEvent.json';

jest.mock('graphql', () => ({
  graphql: () =>
    new Promise(() => {
      throw new Error('Intentional fail!');
    }),
}));

jest.mock('../Schema', () => {});

const headers = {
  'Access-Control-Allow-Origin': '*',
};

it('should fail gracefully', () => {
  graphql(event, null, (error, response) => {
    expect(error).toBe(null);
    expect(response).toEqual({
      statusCode: 500,
      headers,
      body: JSON.stringify({
        errors: [
          {
            message: 'Intentional fail!',
          },
        ],
      }),
    });
  });
});
