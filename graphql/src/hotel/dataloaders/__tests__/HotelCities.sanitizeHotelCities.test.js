// @flow

import { sanitizeHotelCities } from '../HotelCities';

const defaultFields = {
  location: {},
};

it('sorts cities by number of hotels and name', () => {
  expect(
    // $FlowExpectedError - Flow is not happy with spreading exact types
    sanitizeHotelCities([
      {
        ...defaultFields,
        nr_hotels: 0,
        name: 'a',
      },
      {
        ...defaultFields,
        nr_hotels: 1,
        name: 'c',
      },
      {
        ...defaultFields,
        nr_hotels: 1,
        name: 'b',
      },
      {
        ...defaultFields,
        nr_hotels: 2,
        name: 'd',
      },
    ]),
  ).toMatchSnapshot();
});
