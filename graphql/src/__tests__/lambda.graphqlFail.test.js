// @flow

import { graphql } from '../lambda';
import event from './lambdaProxyEvent.json';

jest.mock('graphql', () => {
  const graphql = jest.genMockFromModule('graphql');
  graphql.graphql = () => Promise.reject(new Error('Intentional fail!'));
  return graphql;
});

it('should fail gracefully', () => {
  expect.assertions(2);

  graphql(event, null, (error, response) => {
    expect(error).toBe(null);
    expect(response).toEqual({
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
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
