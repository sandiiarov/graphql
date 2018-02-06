// @flow

export async function get(absoluteApiUrl: string): Promise<Object> {
  const mockResponse = stackOfMockResponses.GET[absoluteApiUrl];
  if (mockResponse !== undefined) {
    return Promise.resolve(mockResponse);
  }

  const patterns = Object.keys(stackOfMockResponses.GET);
  const mockResponseRegex = matchRegex(absoluteApiUrl, patterns);
  if (mockResponseRegex !== undefined) {
    return Promise.resolve(stackOfMockResponses.GET[mockResponseRegex]);
  }

  throw new Error(`Data mock not found for path: ${absoluteApiUrl}`);
}

const stackOfMockResponses: {
  [string]: Object,
} = {
  GET: {},
};

export function __setMockData(
  httpMethod: string,
  absoluteUrl: string,
  mockData: Object,
) {
  stackOfMockResponses[httpMethod][absoluteUrl] = mockData;
}

function matchRegex(url: string, patterns: string[]): ?string {
  return patterns.find(pattern => {
    const regexp = new RegExp(`^${pattern}$`);
    return regexp.test(url);
  });
}
