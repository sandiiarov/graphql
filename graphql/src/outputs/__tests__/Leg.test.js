// @flow

import Leg from '../Leg';
import { evaluateResolver } from '../../services/TestingTools';

const fields = Leg.getFields();

it('Leg type should have valid fields', () => {
  expect(fields).toMatchSnapshot();
});

it('Field "id" should use opaque identifiers', () => {
  expect(evaluateResolver(fields.id, { id: 1 })).toBe('bGVnOjE='); // leg:1
});
