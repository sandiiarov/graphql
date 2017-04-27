// @flow

import FlightsSearchInput from '../FlightsSearchInput';

const fields = FlightsSearchInput.getFields();

it('from field should be non-null String type', () => {
  expect(fields.from.type.toString()).toBe('String!');
});

it('to field should be non-null String type', () => {
  expect(fields.to.type.toString()).toBe('String!');
});

it('dateFrom field should be non-null Date type', () => {
  expect(fields.dateFrom.type.toString()).toBe('Date!');
});

it('dateTo field should be non-null Date type', () => {
  expect(fields.dateTo.type.toString()).toBe('Date!');
});
