// @flow

import Leg from '../Leg';

const fields = Leg.getFields();

it('Leg type should have valid fields', () => {
  expect(fields).toMatchSnapshot();
});

it('Field "id" should use opaque identifiers', () => {
  expect(fields.id.resolve({ id: 1 })).toBe('bGVnOjE='); // leg:1
});
