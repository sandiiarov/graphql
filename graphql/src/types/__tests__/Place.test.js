// @flow

import Place from '../Place';

it('Place type should have valid fields', () => {
  expect(Place.getFields()).toMatchSnapshot();
});
