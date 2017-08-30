// @flow

import Leg from '../Leg';
import type { SimplifiedGraphQLFieldMap } from '../../types/Tests';

const fields = (Leg.getFields(): SimplifiedGraphQLFieldMap);

it('Leg type should have valid fields', () => {
  expect(fields).toMatchSnapshot();
});

it('Field "id" should use opaque identifiers', () => {
  expect(fields.id.resolve({ id: 1 })).toBe('bGVnOjE='); // leg:1
});
