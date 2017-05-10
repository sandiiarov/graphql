// @flow

import Identity from '../Identity';

const fields = Identity.getFields();

it('should have fields defined', () => {
  expect(fields).toMatchSnapshot();
});

it('Field "id" should use opaque identifiers', () => {
  expect(fields.id.resolve({ userId: 1 })).toBe('aWRlbnRpdHk6MQ=='); // identity:1
});
