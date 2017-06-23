// @flow

/**
 * With these types you can work in GraphQL resolvers.
 */

type TimeVariantsType = {
  utc: Date, // UTC +0
  local: Date, // UTC != 0
};

export type DepartureArrivalType = {
  when: ?TimeVariantsType, // null if doesn't exist
  where: {
    code: string,
    cityName: string,
  },
};

export type FlightType = {
  id: string,
  airlines: Array<string>,
  arrival: DepartureArrivalType,
  departure: DepartureArrivalType,
  legs: Array<LegType>,
  price: PriceType,
};

export type BookingsItemType = {
  id: number,
  arrival: DepartureArrivalType,
  departure: DepartureArrivalType,
  legs: Array<LegType>,
  price: PriceType,
  authToken: string,
};

export type BookingType = BookingsItemType & {
  allowedBaggage: AllowedBaggageType,
};

export type LegType = {
  id: string,
  recheckRequired: boolean,
  flightNo: number,
  departure: DepartureArrivalType,
  arrival: DepartureArrivalType,
  airlineCode: string,
};

export type CoordinatesType = {
  lat: number,
  lng: number,
};

export type AdditionalBaggageInfoType = {
  price: PriceType,
  quantity: number,
};

export type AllowedBaggageType = {
  additionalBaggage: Array<AdditionalBaggageInfoType>,
  cabin: Array<BaggageType>,
  checked: Array<BaggageType>,
};

export type BaggageType = {
  height: ?number,
  length: ?number,
  width: ?number,
  weight: ?number,
  note: ?string,
};

export type LoginType = {
  token: string,
  userId: string,
};

export type IdentityType = {
  email: string,
  emailVerified: boolean,
  firstName: ?string,
  lastName: ?string,
  login: string,
  userId: string,
};

export type AirlineType = {
  name: string,
  logoUrl: string,
  code: string,
  isLowCost: boolean,
};

export type PriceType = {
  amount: number,
  currency: string,
};

export type LocationType = {
  locationId: string,
  name: string,
  slug: string,
  timezone: string,
  location: CoordinatesType,
  type: string,
  city: ?LocationAreaType,
  subdivision: ?LocationAreaType,
  country: ?LocationAreaType,
};

export type LocationAreaType = {
  locationId: string,
  name: string,
  slug: string,
};

export type LocationInputType = {
  location: string,
};

export type RadiusType = {
  lat: number,
  lng: number,
  radius: number,
};

export type RadiusInputType = {
  radius: RadiusType,
};

export type AreaType = {
  topLeft: CoordinatesType,
  bottomRight: CoordinatesType,
};
