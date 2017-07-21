// @flow

import Flight from '../Flight';
import LocationDataloader from '../../dataLoaders/Location';
import LocationSuggestionsDataloader from '../../dataLoaders/LocationSuggestions';

jest.mock('../../dataLoaders/Location');
jest.mock('../../dataLoaders/LocationSuggestions');

const mockCalledEndpoints = [];

jest.mock('../../services/HttpRequest', () => {
  const HttpRequest = jest.genMockFromModule('../../services/HttpRequest');
  HttpRequest.get = (url: string) => {
    mockCalledEndpoints.push(url);
    return Promise.resolve({ data: ['something'] });
  };
  return HttpRequest;
});

it('calls the same URL only once', async () => {
  const dataloader = new Flight(
    new LocationDataloader(new LocationSuggestionsDataloader()),
  );

  // first call
  await dataloader.load({
    from: [{ location: 'PRG' }],
    to: [{ location: 'BRQ' }],
    dateFrom: new Date('2020-12-30'),
    dateTo: new Date('2020-12-30'),
    currency: null,
    adults: null,
    locale: null,
  });

  // second call (different)
  await dataloader.load({
    from: [{ location: 'PRG' }],
    to: [{ location: 'LON' }],
    dateFrom: new Date('2020-12-30'),
    dateTo: new Date('2020-12-30'),
    currency: null,
    adults: null,
    locale: null,
  });

  // third call (same as the first one)
  await dataloader.load({
    from: [{ location: 'PRG' }],
    to: [{ location: 'BRQ' }],
    dateFrom: new Date('2020-12-30'),
    dateTo: new Date('2020-12-30'),
    currency: null,
    adults: null,
    locale: null,
  });

  expect(mockCalledEndpoints).toEqual([
    'https://api.skypicker.com/flights?flyFrom=PRG&to=BRQ&dateFrom=30%2F12%2F2020&dateTo=30%2F12%2F2020&v=3',
    'https://api.skypicker.com/flights?flyFrom=PRG&to=LON&dateFrom=30%2F12%2F2020&dateTo=30%2F12%2F2020&v=3',
  ]);
});
