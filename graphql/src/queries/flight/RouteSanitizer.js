// @flow

import _ from 'lodash';
import type { DepartureArrival } from '../../types/Flight';

type propsMap = {
  utc: string,
  local: string,
  code: string,
  cityName: string,
};

export function sanitizeRoute(
  data: Object,
  propsMap: propsMap,
): DepartureArrival {
  const utc = _.get(data, propsMap.utc);
  const local = _.get(data, propsMap.local);
  return {
    when: {
      utc: new Date(utc * 1000),
      local: new Date(local * 1000),
    },
    where: {
      code: _.get(data, propsMap.code),
      cityName: _.get(data, propsMap.cityName),
    },
  };
}
