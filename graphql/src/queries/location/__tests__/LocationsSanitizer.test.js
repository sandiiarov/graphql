// @flow

import { RestApiMock } from '../../../services/TestingTools';
import { sanitizeLocationsForRequest } from '../LocationsSanitizer';
import LocationDataLoader from '../../../dataLoaders/Location';
import LocationSuggestionsDataloader from '../../../dataLoaders/LocationSuggestions';
import config from '../../../../config/application';
import { Location } from '../../../datasets';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'Prague' }),
).replyWithData(Location.prague);

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({ term: 'Mexico' }),
).replyWithData(Location.mexico);

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
