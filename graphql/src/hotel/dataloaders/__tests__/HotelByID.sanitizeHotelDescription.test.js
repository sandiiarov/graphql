// @flow

import { sanitizeHotelDescription } from '../HotelByID';

it('works with empty descriptions field', () => {
  expect(sanitizeHotelDescription([])).toBe(null);
});

it('works without summary', () => {
  expect(
    sanitizeHotelDescription([
      {
        descriptiontype_id: '1', // something is here but it's not summary
        description: 'string',
      },
    ]),
  ).toBe(null);
});

it('works with summary', () => {
  expect(
    sanitizeHotelDescription([
      {
        descriptiontype_id: '6', // this is considered summary
        description: 'Hello Summary',
      },
    ]),
  ).toBe('Hello Summary');
});

it('finds the first summary', () => {
  expect(
    sanitizeHotelDescription([
      {
        descriptiontype_id: '1', // not a summary
        description: 'string',
      },
      {
        descriptiontype_id: '6', // this is considered summary
        description: 'Hello Summary 1',
      },
      {
        descriptiontype_id: '1', // not a summary
        description: 'string',
      },
      {
        descriptiontype_id: '6', // this is considered summary
        description: 'Hello Summary 2',
      },
    ]),
  ).toBe('Hello Summary 1');
});
