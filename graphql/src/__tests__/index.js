// @flow

import index from '../index';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.resetAllMocks();
});

it('should return response from API', async () => {
  let tested = false;
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
          JSON.stringify(
            {
              data: {
                __type: {
                  kind: 'OBJECT',
                },
              },
            },
            null,
            2,
          ),
        );
        tested = true;
      },
    },
  );
  expect(tested).toBe(true);
});

it('handles syntax errors correctly', async () => {
  let tested = false;
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
          JSON.stringify(
            {
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
            },
            null,
            2,
          ),
        );
        expect(console.error).toHaveBeenCalled();
        expect(console.error.mock.calls).toMatchSnapshot();
        tested = true;
      },
    },
  );
  expect(tested).toBe(true);
});
