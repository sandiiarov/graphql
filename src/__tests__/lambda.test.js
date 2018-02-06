// @flow

import request from 'supertest';
import server from '../graphqlServer';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.resetAllMocks();
});

it('should return valid response', async () => {
  const response = await request(server)
    .post('/')
    .send({
      query: '{__schema{queryType{name}}}',
    });
  expect(cleanResponse(response)).toMatchSnapshot();
});

it('should throw error when parsing invalid JSON', async () => {
  const response = await request(server)
    .post('/')
    .send({ query: '{invalid json' });
  expect(cleanResponse(response)).toMatchSnapshot();
});

it('should throw error when parsing body without query field', async () => {
  const response = await request(server)
    .post('/')
    .send({});
  expect(cleanResponse(response)).toMatchSnapshot();
});

function cleanResponse(response: {
  statusCode: Number,
  headers: Object,
  body: Object,
}) {
  const { statusCode, headers, body } = response;
  const { date, etag, ...cleanedHeaders } = headers;
  return { statusCode, headers: cleanedHeaders, body };
}
