// @flow

import { RestApiMock } from '../../../services/TestingTools';
import { sanitizeLocationsForRequest } from '../LocationsSanitizer';
import LocationDataLoader from '../../../dataLoaders/Location';
import LocationSuggestionsDataloader
  from '../../../dataLoaders/LocationSuggestions';
import config from '../../../../config/application';
import locationPrague
  from '../../flight/__tests__/__datasets__/AllLocations.prague.json';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'Prague' }),
).replyWithData(locationPrague);

describe('Stringify location inputs', () => {
  it('should return location ids and radius as a string', async () => {
    const from = [
      { location: 'Prague' },
      {
        radius: {
          lat: 10.2,
          lng: 14.9,
          radius: 105,
        },
      },
    ];
    const to = [{ location: 'Mexico' }];
    const dataLoader = new LocationDataLoader(
      new LocationSuggestionsDataloader(),
    );

    expect(await sanitizeLocationsForRequest(from, to, dataLoader)).toEqual([
      ['prague_cz', '10.2-14.9-105km'],
      ['MEX'],
    ]);
  });
});
