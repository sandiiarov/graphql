// @flow

import { RestApiMock } from '../../../common/services/TestingTools';
import Location from '../Location';
import options from '../../../../config/application';

import locationsJsonUnknown from './__datasets__/locations-unknown.json';

beforeEach(() => {
  RestApiMock.onGet(
    options.restApiEndpoint.allLocations({
      type: 'id',
      id: 'unknown',
    }),
  ).replyWithData(locationsJsonUnknown);
});

it('throws error when loading unknown location by ID', async () => {
  expect.assertions(1);
  const dataloader = new Location();
  await expect(dataloader.loadById('unknown')).rejects.toEqual(
    new Error('Location has not been found.'),
  );
});
