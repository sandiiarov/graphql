// @flow

import Locations from '../Locations';
import options from '../../../../config/application';

let dataloader;
let mockCalledURLs;

beforeEach(() => {
  dataloader = new Locations();
  mockCalledURLs = [];
});

jest.mock('../../../common/services/HttpRequest', () => {
  const HttpRequest = jest.genMockFromModule(
    '../../../common/services/HttpRequest',
  );
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
  await dataloader.loadByTerm(term);
  await dataloader.loadByTerm(term);
  expect(mockCalledURLs).toEqual([
    options.restApiEndpoint.allLocations({ term: term }),
  ]);
});

it('calls scalar BBB only once', async () => {
  const term = 'BBB';
  await dataloader.loadByTerm(term);
  await dataloader.loadByTerms([term, term]);
  expect(mockCalledURLs).toEqual([
    options.restApiEndpoint.allLocations({ term: term }),
  ]);
});

it('calls scalar CCC only once (changed order)', async () => {
  const term = 'CCC';
  await dataloader.loadByTerms([term, term]);
  await dataloader.loadByTerm(term);
  expect(mockCalledURLs).toEqual([
    options.restApiEndpoint.allLocations({ term: term }),
  ]);
});

it('calls scalars AAA and BBB only once', async () => {
  await dataloader.loadByTerm('AAA');
  await dataloader.loadByTerms(['BBB', 'AAA']); // AAA again
  expect(mockCalledURLs).toEqual([
    options.restApiEndpoint.allLocations({ term: 'AAA' }),
    options.restApiEndpoint.allLocations({ term: 'BBB' }),
  ]);
});

it('calls scalars AAA, BBB and CCC', async () => {
  await dataloader.loadByTerm('AAA');
  await dataloader.loadByTerms(['BBB', 'CCC']);
  expect(mockCalledURLs).toEqual([
    options.restApiEndpoint.allLocations({ term: 'AAA' }),
    options.restApiEndpoint.allLocations({ term: 'BBB' }),
    options.restApiEndpoint.allLocations({ term: 'CCC' }),
  ]);
});
