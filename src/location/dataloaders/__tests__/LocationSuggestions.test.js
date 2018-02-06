// @flow

import { RestApiMock } from '../../../common/services/TestingTools';
import LocationSuggestions from '../LocationSuggestions';
import options from '../../../../config/application';

import locationsJsonPRG from './__datasets__/locations-prg.json';
import locationsJsonBRQ from './__datasets__/locations-brq.json';
import locationsJsonUnknown from './__datasets__/locations-unknown.json';
import PragueDataset from '../../datasets/prague-cs-CZ.json';

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
      term: 'PRG',
      locale: 'cs-CZ',
    }),
  ).replyWithData(PragueDataset);
});

it('returns PRG suggestions', async () => {
  const dataloader = new LocationSuggestions();
  const result = await dataloader.loadByKey('PRG');
  expect(result).toMatchSnapshot();
});

it('returns PRG suggestions in cs-CZ', async () => {
  const dataloader = new LocationSuggestions();
  const result = await dataloader.loadByKey('PRG', { locale: 'cs-CZ' });
  expect(result).toMatchSnapshot();
});

it('returns many PRG suggestions in cs-CZ', async () => {
  const dataloader = new LocationSuggestions();
  const result = await dataloader.loadMany(['PRG', 'PRG'], { locale: 'cs-CZ' });
  expect(result).toMatchSnapshot();
});

it('returns PRG and BRQ suggestions', async () => {
  const dataloader = new LocationSuggestions();
  const result = await dataloader.loadMany(['PRG', 'BRQ']);
  expect(result).toMatchSnapshot();
});

it('returns BRQ and PRG suggestions (changed order)', async () => {
  const dataloader = new LocationSuggestions();
  const result = await dataloader.loadMany(['BRQ', 'PRG']);
  // $FlowExpectedError: returned type may be an Error
  expect(result[0][0].name).toEqual('Brno\u2013Tu\u0159any');
  // $FlowExpectedError: returned type may be an Error
  expect(result[1][0].name).toBe('V\u00E1clav Havel Airport Prague');
});

it('throws error when accessing unknown location', async () => {
  const dataloader = new LocationSuggestions();
  await expect(
    dataloader.loadMany(['this location does not exist', 'PRG']),
  ).rejects.toEqual(new Error('Location has not been found.'));
});
