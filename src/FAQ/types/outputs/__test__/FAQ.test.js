// @flow

import FAQ from '../FAQ';

it('allFAQs type should have valid fields', () => {
  expect(FAQ.getFields()).toMatchSnapshot();
});
