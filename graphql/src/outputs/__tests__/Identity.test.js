// @flow

import Identity from '../Identity';
import type { SimplifiedGraphQLFieldMap } from '../../types/Tests';
import type { Identity as IdentityType } from '../../types/User';

const fields = (Identity.getFields(): SimplifiedGraphQLFieldMap);

it('should have fields defined', () => {
  expect(fields).toMatchSnapshot();
});

it('Field "id" should use opaque identifiers', () => {
  expect(fields.id.resolve({ userId: 1 })).toBe('aWRlbnRpdHk6MQ=='); // identity:1
});

describe('Field "fullName"', () => {
  const identity: IdentityType = {
    email: 'e@mail.com',
    emailVerified: true,
    firstName: 'First',
    lastName: 'Last',
    login: 'log@in',
    userId: '21',
  };

  it('returns concatenation of first and last name', () => {
    expect(fields.fullName.resolve(identity)).toBe('First Last');
  });

  it('returns login as a fallback', () => {
    expect(
      fields.fullName.resolve({
        ...identity,
        firstName: null,
        lastName: null,
      }),
    ).toBe('log@in');
  });

  it('returns login if firstName is missing', () => {
    expect(
      fields.fullName.resolve({
        ...identity,
        firstName: null,
      }),
    ).toBe('Last');
  });

  it('returns login if lastName is missing', () => {
    expect(
      fields.fullName.resolve({
        ...identity,
        lastName: null,
      }),
    ).toBe('First');
  });
});
