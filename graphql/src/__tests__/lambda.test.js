import { graphql } from '../lambda';
import event from './lambdaProxyEvent.json';

const headers = {
  'Access-Control-Allow-Origin': '*',
};

it('should return valid response', () => {
  graphql(event, null, (error, response) => {
    expect(error).toBe(null);
    expect(response).toEqual({
      statusCode: 200,
      headers,
      body: JSON.stringify({
        data: {
          __schema: {
            queryType: {
              name: 'RootQuery',
            },
          },
        },
      }),
    });
  });
});

it('should throw error when parsing invalid JSON', () => {
  const event = {
    body: '{invalid json',
  };
  graphql(event, null, (error, response) => {
    expect(error).toBe(null);
    expect(response).toEqual({
      statusCode: 500,
      headers,
      body: JSON.stringify({
        errors: [
          {
            message: 'Request body should contain only valid JSON in the following format: {"query":"{__schema{types{name}}}"}',
          },
        ],
      }),
    });
  });
});

it('should throw error when parsing body without query field', () => {
  const event = {
    body: '{}',
  };
  graphql(event, null, (error, response) => {
    expect(error).toBe(null);
    expect(response).toEqual({
      statusCode: 500,
      headers,
      body: JSON.stringify({
        errors: [
          {
            message: 'Requested body doesn\'t contain "query" field.',
          },
        ],
      }),
    });
  });
});
