// @flow

import Location from '../Location';

const fields = Location.getFields();

it('Latitude field should be nullable Float type', () => {
  expect(fields.latitude.type.toString()).toBe('Float');
});

it('Longitude field should be nullable Float type', () => {
  expect(fields.longitude.type.toString()).toBe('Float');
});
