// @flow

import Airline from '../Airline';

it('Airline type should have valid fields', () => {
  expect(Airline.getFields()).toMatchSnapshot();
});
