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
  return url => {
    mockCalledURLs.push(url);
    return {
      locations: ['mocked'],
    };
  };
});

it('calls scalar AAA only once', async () => {
  const term = 'AAA';
  await dataloader.load(term);
  await dataloader.load(term);
  expect(mockCalledURLs).toEqual([
    options.restApiEndpoint.allLocations({ term: term }),
  ]);
});

it('calls scalar BBB only once', async () => {
  const term = 'BBB';
  await dataloader.load(term);
  await dataloader.loadMany([term, term]);
  expect(mockCalledURLs).toEqual([
    options.restApiEndpoint.allLocations({ term: term }),
  ]);
});

it('calls scalar CCC only once (changed order)', async () => {
  const term = 'CCC';
  await dataloader.loadMany([term, term]);
  await dataloader.load(term);
  expect(mockCalledURLs).toEqual([
    options.restApiEndpoint.allLocations({ term: term }),
  ]);
});

it('calls scalars AAA and BBB only once', async () => {
  await dataloader.load('AAA');
  await dataloader.loadMany(['BBB', 'AAA']); // AAA again
  expect(mockCalledURLs).toEqual([
    options.restApiEndpoint.allLocations({ term: 'AAA' }),
    options.restApiEndpoint.allLocations({ term: 'BBB' }),
  ]);
});

it('calls scalars AAA, BBB and CCC', async () => {
  await dataloader.load('AAA');
  await dataloader.loadMany(['BBB', 'CCC']);
  expect(mockCalledURLs).toEqual([
    options.restApiEndpoint.allLocations({ term: 'AAA' }),
    options.restApiEndpoint.allLocations({ term: 'BBB' }),
    options.restApiEndpoint.allLocations({ term: 'CCC' }),
  ]);
});
