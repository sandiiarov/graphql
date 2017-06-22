// @flow

export default function request(absoluteApiUrl: string): Promise<Object> {
  const mockResponse = stackOfMockResponses.GET[absoluteApiUrl];
  if (mockResponse !== undefined) {
    return Promise.resolve(mockResponse);
  }
  throw new Error(`Data mock not found for path: ${absoluteApiUrl}`);
}

export async function post(absoluteApiUrl: string): Promise<Object> {
  const mockResponse = stackOfMockResponses.POST[absoluteApiUrl];
  if (mockResponse !== undefined) {
    return Promise.resolve(mockResponse);
  }
  throw new Error(`Data mock not found for path: ${absoluteApiUrl}`);
}

const stackOfMockResponses: {
  [string]: Object,
} = {
  POST: {},
  GET: {},
};

export function __setMockData(
  httpMethod: string,
  absoluteUrl: string,
  mockData: Object,
) {
  stackOfMockResponses[httpMethod][absoluteUrl] = mockData;
}
