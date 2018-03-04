// @flow

import _ from 'lodash';

import type { LocationArea, Location } from '../Location';

export function sanitizeApiResponse(location: Object): Location {
  return {
    locationId: location.id,
    name: location.name,
    slug: location.slug,
    timezone: location.timezone,
    location: {
      lat: _.get(location, 'location.lat', null),
      lng: _.get(location, 'location.lon', null),
    },
    type: location.type,
    city: sanitizeLocationArea(location.city),
    subdivision: sanitizeLocationArea(location.subdivision),
    country: sanitizeLocationArea(location.country),
    isActive: location.active,
    stationsCount: location.stations,
    airportsCount: location.airports,
    alternativeNames: location.alternative_names,
    autonomousTerritory: sanitizeLocationArea(location.autonomous_territory),
  };
}

function sanitizeLocationArea(area: null | Object): ?LocationArea {
  return area
    ? {
        locationId: area.id,
        name: area.name,
        slug: area.slug,
      }
    : null;
}
