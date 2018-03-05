// @flow

import { RestApiMock } from '../../../common/services/TestingTools';
import Location from '../Location';
import LocationSuggestions from '../LocationSuggestions';
import options from '../../../../config/application';

import locationsJsonPRG from './__datasets__/locations-prg.json';
import locationsJsonBRQ from './__datasets__/locations-brq.json';
import locationsJsonUnknown from './__datasets__/locations-unknown.json';

beforeEach(() => {
  RestApiMock.onGet(
    options.restApiEndpoint.allLocations({
      term: 'PRG',
    }),
  ).replyWithData(locationsJsonPRG);

  RestApiMock.onGet(
    options.restApiEndpoint.allLocations({
      term: 'BRQ',
    }),
  ).replyWithData(locationsJsonBRQ);

  RestApiMock.onGet(
    options.restApiEndpoint.allLocations({
      term: 'this location does not exist',
    }),
  ).replyWithData(locationsJsonUnknown);

  RestApiMock.onGet(
    options.restApiEndpoint.allLocations({
      type: 'id',
      id: 'unknown',
    }),
  ).replyWithData(locationsJsonUnknown);
});

it('returns single PRG result', async () => {
  const dataloader = new Location(new LocationSuggestions());
  const result = await dataloader.load('PRG');
  expect(result).toMatchSnapshot();
});

it('returns single PRG and BRQ result', async () => {
  const dataloader = new Location(new LocationSuggestions());
  const result = await dataloader.loadMany(['PRG', 'BRQ']);
  expect(result).toMatchSnapshot();
});

it('throws error when accessing unknown location', async () => {
  expect.assertions(1);
  const dataloader = new Location(new LocationSuggestions());
  await expect(
    dataloader.loadMany(['this location does not exist']),
  ).rejects.toEqual(new Error('Location has not been found.'));
});

it('throws error when loading unknown location by ID', async () => {
  expect.assertions(1);
  const dataloader = new Location(new LocationSuggestions());
  await expect(dataloader.loadById('unknown')).rejects.toEqual(
    new Error('Location has not been found.'),
  );
});
