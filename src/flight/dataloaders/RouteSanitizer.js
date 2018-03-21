// @flow

import type { DepartureArrival } from '../Flight';

export function sanitizeRoute(data: {|
  utc: ?number,
  local: ?number,
  code: ?string,
  cityName: ?string,
|}): DepartureArrival {
  let whenObject = null;
  if (data.utc && data.local) {
    whenObject = {
      utc: new Date(data.utc * 1000),
      local: new Date(data.local * 1000),
    };
  }

  return {
    when: whenObject,
    where: {
      code: data.code || '',
      cityName: data.cityName || '',
    },
  };
}
