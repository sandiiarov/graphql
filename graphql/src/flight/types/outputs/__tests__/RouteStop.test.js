// @flow

import GraphQLRouteStop from '../RouteStop';
import { evaluateResolver } from '../../../../common/services/TestingTools';

it('RouteStop type should have valid fields', () => {
  expect(GraphQLRouteStop.getFields()).toMatchSnapshot();
});

describe('time fields are able to handle null input values', () => {
  const routeStopFields = GraphQLRouteStop.getFields();

  it('for local time', () => {
    expect(evaluateResolver(routeStopFields.localTime, { when: null })).toBe(
      null,
    );
  });

  it('for global time', () => {
    expect(evaluateResolver(routeStopFields.time, { when: null })).toBe(null);
  });
});
