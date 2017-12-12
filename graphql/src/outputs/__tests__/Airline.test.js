// @flow

import Airline from '../../flight/types/outputs/Airline';

it('Airline type should have valid fields', () => {
  expect(Airline.getFields()).toMatchSnapshot();
});
