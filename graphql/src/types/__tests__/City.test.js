// @flow

import City from '../City';

it('City type should have valid fields', () => {
  expect(City.getFields()).toMatchSnapshot();
});
