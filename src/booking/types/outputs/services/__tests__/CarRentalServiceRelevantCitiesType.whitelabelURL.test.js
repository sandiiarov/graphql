// @flow

import CarRentalServiceRelevantCities from '../CarRentalServiceRelevantCities';
import { evaluateResolver } from '../../../../../common/services/TestingTools';

const fields = CarRentalServiceRelevantCities.getFields();

it('resolves to the correct URL', () => {
  expect(
    evaluateResolver(
      fields.whitelabelURL,
      {
        location: {
          locationId: 'PRG', // IATA
        },
        pickup: new Date('2018-12-24T12:34Z'),
        dropoff: new Date('2018-12-30T12:34Z'),
      },
      {},
      {
        locale: {
          language: 'cs',
        },
      },
    ).split('&'),
  ).toMatchSnapshot();
});

it('works with unexpected locale', () => {
  expect(
    evaluateResolver(
      fields.whitelabelURL,
      {
        location: {
          locationId: 'PRG', // IATA
        },
        pickup: new Date('2018-12-24T12:34Z'),
        dropoff: new Date('2018-12-30T12:34Z'),
      },
      {},
      {
        locale: {
          language: 'what is this?', // will resolve to the 'en'
        },
      },
    ).split('&'),
  ).toMatchSnapshot();
});
