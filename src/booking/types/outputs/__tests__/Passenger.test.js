// @flow

import Passenger from '../Passenger';
import { evaluateResolver } from '../../../../common/services/TestingTools';

const fields = Passenger.getFields();

const passenger = {
  firstname: 'First',
  lastname: 'Last',
};

it('handles firstname and lastname', () => {
  expect(
    evaluateResolver(fields.fullName, {
      ...passenger,
    }),
  ).toBe('First Last');
});

it('handles firstname equal null', () => {
  expect(
    evaluateResolver(fields.fullName, {
      ...passenger,
      firstname: null,
    }),
  ).toBe('Last');
});

it('handles lastname equal null', () => {
  expect(
    evaluateResolver(fields.fullName, {
      ...passenger,
      lastname: null,
    }),
  ).toBe('First');
});

it('handles firstname equal undefined', () => {
  expect(
    evaluateResolver(fields.fullName, {
      ...passenger,
      firstname: undefined,
    }),
  ).toBe('Last');
});

it('handles lastname equal undefined', () => {
  expect(
    evaluateResolver(fields.fullName, {
      ...passenger,
      lastname: undefined,
    }),
  ).toBe('First');
});
