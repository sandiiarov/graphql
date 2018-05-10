// @flow

import type { HotelType as Hotel } from '../../../hotel/dataloaders/flow/HotelType';
import type { Flight } from '../../../flight/Flight';

export type DynamicPackageType = {|
  id: string,
  hotel: Hotel,
  flight: Flight,
  whitelabelUrl: string,
|};
