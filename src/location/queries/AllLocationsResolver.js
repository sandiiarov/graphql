// @flow

import parseSlugRadius from '../services/SlugRadiusParser';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import type { Rectangle } from '../Location';

export async function getLocations(
  ancestor: mixed,
  args: Object,
  context: GraphqlContextType,
) {
  let response;
  const { locale } = context;
  const options = { locale, ...(args.options || {}) };

  if (args.search) {
    response = await context.dataLoader.locations.loadByTerm(
      args.search,
      options,
    );
  } else if (args.radius) {
    response = await context.dataLoader.locations.loadByRadius(
      args.radius,
      options,
    );
  } else if (args.area) {
    validateArea(args.area);
    response = await context.dataLoader.locations.loadByArea(
      args.area,
      options,
    );
  } else if (args.slugRadius) {
    const { radius, ...parsed } = parseSlugRadius(args.slugRadius);
    let radiusGps = { radius, lat: 0, lng: 0 };
    if (parsed.slug) {
      const { location } = await context.dataLoader.location.loadBySlug(
        parsed.slug,
        options.locale,
      );
      radiusGps = { ...radiusGps, ...location };
    } else if (parsed.gps) {
      radiusGps = { ...radiusGps, ...parsed.gps };
    }

    response = await context.dataLoader.locations.loadByRadius(
      radiusGps,
      options,
    );
  } else {
    response = await context.dataLoader.locations.loadAll(options);
  }
  return response;
}

function validateArea({ topLeft, bottomRight }: Rectangle) {
  if (topLeft.lat <= bottomRight.lat) {
    throw new Error(
      `Top left latitude of the area should be greater than bottom right latitude.`,
    );
  }
  if (topLeft.lng >= bottomRight.lng) {
    throw new Error(
      `Top left longitude of the area should be lower than bottom right longitude.`,
    );
  }
}
