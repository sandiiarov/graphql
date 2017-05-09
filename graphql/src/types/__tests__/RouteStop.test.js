// @flow

import GraphQLRouteStop from '../RouteStop';

describe('airport field', () => {
  const airport = GraphQLRouteStop.getFields().airport;
  it('should be non-null Airport type', () => {
    expect(airport.type.toString()).toBe('Airport!');
  });
});

describe('time fields returns nullable DateTime types', () => {
  const routeStopFields = GraphQLRouteStop.getFields();

  it('for local time', () => {
    expect(routeStopFields.localTime.type.toString()).toBe('DateTime');
  });

  it('for global time', () => {
    expect(routeStopFields.time.type.toString()).toBe('DateTime');
  });
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
