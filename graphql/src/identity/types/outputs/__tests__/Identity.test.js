// @flow

import Identity from '../Identity';
import { evaluateResolver } from '../../../../common/services/TestingTools';

import type { Identity as IdentityType } from '../../../User';

const fields = Identity.getFields();

it('should have fields defined', () => {
  expect(fields).toMatchSnapshot();
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
    expect(evaluateResolver(fields.fullName, identity)).toBe('First Last');
  });

  it('returns login as a fallback', () => {
    expect(
      evaluateResolver(fields.fullName, {
        ...identity,
        firstName: null,
        lastName: null,
      }),
    ).toBe('log@in');
  });

  it('returns login if firstName is missing', () => {
    expect(
      evaluateResolver(fields.fullName, {
        ...identity,
        firstName: null,
      }),
    ).toBe('Last');
  });

  it('returns login if lastName is missing', () => {
    expect(
      evaluateResolver(fields.fullName, {
        ...identity,
        lastName: null,
      }),
    ).toBe('First');
  });
});
