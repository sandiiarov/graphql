// @flow

import type { Address } from '../../../common/types/outputs/Address';

export type HotelType = {|
  id: string,
  name: string,
  rating: number,
  review: {|
    score: number,
    count: number,
  |},
  currencyCode: string,
  price: ?string, // actually float as a string
  whitelabelUrl: string,
  cityName: string,
  address: Address,
  summary: string,
|};
