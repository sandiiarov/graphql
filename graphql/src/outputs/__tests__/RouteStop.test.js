// @flow

import GraphQLRouteStop from '../RouteStop';

it('RouteStop type should have valid fields', () => {
  expect(GraphQLRouteStop.getFields()).toMatchSnapshot();
});

describe('time fields are able to handle null input values', () => {
  const routeStopFields = GraphQLRouteStop.getFields();

  it('for local time', () => {
    expect(routeStopFields.localTime.resolve({ when: null })).toBe(null);
  });

  it('for global time', () => {
    expect(routeStopFields.time.resolve({ when: null })).toBe(null);
  });
});
