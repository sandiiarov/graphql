// @flow

import AllHotels from './hotel/queries/AllAvailableHotels';

/**
 * These queries are deprecated and will be removed in the future.
 */
export default {
  allHotels: {
    ...AllHotels,
    deprecationReason: "Use 'allAvailableHotels' query instead.",
  },
};
