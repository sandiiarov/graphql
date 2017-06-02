// @flow

import { createAirline } from '../Airline';

describe('Airline creation', () => {
  it('should create airline object', () => {
    expect(createAirline('OK')).toMatchSnapshot();
  });
});
