// @flow

import Booking from '../Booking';
import { evaluateResolver } from '../../services/TestingTools';

const fields = Booking.getFields();

it('Booking type should have valid fields', () => {
  expect(fields).toMatchSnapshot();
});

it('Field "id" should use opaque identifier', () => {
  expect(evaluateResolver(fields.id, { id: 1 })).toBe('Ym9va2luZzox'); // booking:1
});
