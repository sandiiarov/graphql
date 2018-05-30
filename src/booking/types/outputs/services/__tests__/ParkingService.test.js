// @flow

import ParkingService from '../ParkingService';
import { evaluateResolver } from '../../../../../common/services/TestingTools';

const fields = ParkingService.getFields();

it('resolves to the correct URL', () => {
  expect(
    evaluateResolver(
      fields.whitelabelURL,
      {
        iataCode: 'LHR',
        fromDate: new Date('2018-12-24T12:00:00Z'),
        toDate: new Date('2018-12-30T09:00:00Z'),
      },
      undefined,
      {
        locale: 'cs_CZ',
      },
    ),
  ).toBe(
    'http://kiwi.parkcloud.com/cs-CZ/Search/LHR/201812241200/201812300900',
  );
});

it('handles unknown locales', () => {
  expect(
    evaluateResolver(
      fields.whitelabelURL,
      {
        iataCode: 'LHR',
        fromDate: new Date('2018-12-24T12:00:00Z'),
        toDate: new Date('2018-12-30T09:00:00Z'),
      },
      undefined,
      {
        locale: 'unknown',
      },
    ),
  ).toBe(
    'http://kiwi.parkcloud.com/en-GB/Search/LHR/201812241200/201812300900',
  );
});

it('handles unknown IATA', () => {
  expect(
    evaluateResolver(
      fields.whitelabelURL,
      {
        iataCode: 'unknown',
        fromDate: new Date('2018-12-24T12:00:00Z'),
        toDate: new Date('2018-12-30T09:00:00Z'),
      },
      undefined,
      {
        locale: 'unknown',
      },
    ),
  ).toBeNull();
});
