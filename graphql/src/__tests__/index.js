// @flow

import index from '../index';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.resetAllMocks();
});

it('should return response from API', async () => {
  expect.assertions(1);

  await index.default(
    {
      method: 'POST',
      headers: {},
      body: {
        query: '{__type(name:"RootQuery"){kind}}',
      },
    },
    {
      statusCode: 123,
      setHeader: () => {}, // just a mock
      end: data => {
        expect(data).toEqual(
          JSON.stringify({
            data: {
              __type: {
                kind: 'OBJECT',
              },
            },
          }),
        );
      },
    },
  );
});

it('handles syntax errors correctly', async () => {
  expect.assertions(3);

  await index.default(
    {
      method: 'POST',
      headers: {},
      body: {
        query: '{', // syntax error
      },
    },
    {
      statusCode: 123,
      setHeader: () => {}, // just a mock
      end: data => {
        expect(data).toEqual(
          JSON.stringify({
            errors: [
              {
                message: 'Syntax Error GraphQL request (1:2) Expected Name, found <EOF>\n\n1: {\n    ^\n',
                locations: [
                  {
                    line: 1,
                    column: 2,
                  },
                ],
              },
            ],
          }),
        );
        expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
        expect(console.error.mock.calls).toMatchSnapshot(); // eslint-disable-line no-console
      },
    },
  );
});
