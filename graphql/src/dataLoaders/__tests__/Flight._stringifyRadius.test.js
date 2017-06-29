// @flow

import Flight from '../Flight';
import LocationDataloader from '../../dataLoaders/Location';
import LocationSuggestionsDataloader from '../../dataLoaders/LocationSuggestions';

jest.mock('../../dataLoaders/Location');
jest.mock('../../dataLoaders/LocationSuggestions');

let dataloader;

beforeEach(() => {
  dataloader = new Flight(
    new LocationDataloader(new LocationSuggestionsDataloader()),
  );
});

it('should stringify radius', async () => {
  expect(
    dataloader._stringifyRadius({
      radius: {
        lat: 10.2,
        lng: 14.9,
        radius: 105,
      },
    }),
  ).toBe('10.2-14.9-105km');
});

it('should stringify radius and format to 2 decimals', async () => {
  expect(
    dataloader._stringifyRadius({
      radius: {
        lat: 10.2572,
        lng: 14.988,
        radius: 105.56,
      },
    }),
  ).toBe('10.26-14.99-106km');
});
