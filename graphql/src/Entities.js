// @flow

/**
 * With these types you can work in GraphQL resolvers.
 */

export type AirportType = {
  code: string,
  name: string,
};

type TimeVariantsType = {
  utc: Date, // UTC +0
  local: Date, // UTC != 0
};

export type DepartureType = {
  when: ?TimeVariantsType, // null if doesn't exist
  where: AirportType,
};

export type ArrivalType = {
  when: ?TimeVariantsType, // null if doesn't exist
  where: AirportType,
};

export type FlightType = {
  id: string,
  arrival: ArrivalType,
  departure: DepartureType,
  legs: Array<LegType>,
  airlines: Array<string>,
};

export type BookingsItemType = {
  id: number,
  arrival: ArrivalType,
  departure: DepartureType,
  legs: Array<LegType>,
  authToken: string,
};

export type BookingType = BookingsItemType & {
  allowedBaggage: AllowedBaggageType,
};

export type LegType = {
  id: string,
  recheckRequired: boolean,
  flightNo: number,
  departure: DepartureType,
  arrival: ArrivalType,
  airline: string, // type
};

export type LocationType = {
  latitude: number,
  longitude: number,
};

export type PlaceType = {
  id: string,
  location: LocationType,
  numberOfAirports: number,
  population: ?number,
  name: string,
};

export type AllowedBaggageType = {
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
