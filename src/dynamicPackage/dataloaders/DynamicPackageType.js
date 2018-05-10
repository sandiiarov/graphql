// @flow

import type { Price } from '../../common/types/Price';
import type { PhotoType } from '../../hotel/dataloaders/flow/PhotoType';

export type DynamicPackage = {|
  hotel: Hotel,
  flight: Flight,
  price: Price,
  whitelabelUrl: string,
|};

type Hotel = {|
  id: string,
  name: string,
  rating: number,
  review: { score: number },
  photos: PhotoType[],
  price: Price,
|};

type Flight = {|
  price: Price,
  airlines: string[],
|};
