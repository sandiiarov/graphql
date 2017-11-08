// @flow

import LocationSuggestions from '../LocationSuggestions';
import options from '../../../config/application';

let dataloader;
let mockCalledURLs;

beforeEach(() => {
  dataloader = new LocationSuggestions();
  mockCalledURLs = [];
});

jest.mock('../../services/HttpRequest', () => {
  const HttpRequest = jest.genMockFromModule('../../services/HttpRequest');
  HttpRequest.get = url => {
    mockCalledURLs.push(url);
    return {
      locations: ['mocked'],
    };
  };
  return HttpRequest;
});

it('calls scalar AAA only once', async () => {
  const term = 'AAA';
  await dataloader.loadByKey(term);
  await dataloader.loadByKey(term);
  expect(mockCalledURLs).toEqual([
    options.restApiEndpoint.allLocations({ term: term }),
  ]);
});

it('calls scalar BBB only once', async () => {
  const term = 'BBB';
  await dataloader.loadByKey(term);
  await dataloader.loadMany([term, term]);
  expect(mockCalledURLs).toEqual([
    options.restApiEndpoint.allLocations({ term: term }),
  ]);
});

it('calls scalar CCC only once (changed order)', async () => {
  const term = 'CCC';
  await dataloader.loadMany([term, term]);
  await dataloader.loadByKey(term);
  expect(mockCalledURLs).toEqual([
    options.restApiEndpoint.allLocations({ term: term }),
  ]);
});

it('calls scalars AAA and BBB only once', async () => {
  await dataloader.loadByKey('AAA');
  await dataloader.loadMany(['BBB', 'AAA']); // AAA again
  expect(mockCalledURLs).toEqual([
    options.restApiEndpoint.allLocations({ term: 'AAA' }),
    options.restApiEndpoint.allLocations({ term: 'BBB' }),
  ]);
});

it('calls scalars AAA, BBB and CCC', async () => {
  await dataloader.loadByKey('AAA');
  await dataloader.loadMany(['BBB', 'CCC']);
  expect(mockCalledURLs).toEqual([
    options.restApiEndpoint.allLocations({ term: 'AAA' }),
    options.restApiEndpoint.allLocations({ term: 'BBB' }),
    options.restApiEndpoint.allLocations({ term: 'CCC' }),
  ]);
});
