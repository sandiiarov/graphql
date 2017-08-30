// @flow

import Booking from '../Booking';
import type { SimplifiedGraphQLFieldMap } from '../../types/Tests';

const fields = (Booking.getFields(): SimplifiedGraphQLFieldMap);

it('Booking type should have valid fields', () => {
  expect(fields).toMatchSnapshot();
});

it('Field "id" should use opaque identifier', () => {
  expect(fields.id.resolve({ id: 1 })).toBe('Ym9va2luZzox'); // booking:1
});
