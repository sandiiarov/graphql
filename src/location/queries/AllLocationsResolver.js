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
  if (args.search) {
    response = await context.dataLoader.locationSuggestions.loadByKey(
      args.search,
      args.options,
    );
  } else if (args.radius) {
    response = await context.dataLoader.locationSuggestions.loadByRadius(
      args.radius,
      args.options,
    );
  } else if (args.area) {
    validateArea(args.area);
    response = await context.dataLoader.locationSuggestions.loadByArea(
      args.area,
      args.options,
    );
  } else if (args.slugRadius) {
    const { radius, ...parsed } = parseSlugRadius(args.slugRadius);
    let radiusGps = { radius, lat: 0, lng: 0 };
    if (parsed.slug) {
      const { location } = await context.dataLoader.location.loadBySlug(
        parsed.slug,
      );
      radiusGps = { ...radiusGps, ...location };
    } else if (parsed.gps) {
      radiusGps = { ...radiusGps, ...parsed.gps };
    }

    response = await context.dataLoader.locationSuggestions.loadByRadius(
      radiusGps,
      args.options,
    );
  } else {
    response = await context.dataLoader.locationSuggestions.load(args.options);
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
