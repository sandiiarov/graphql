// @flow

export type Coordinates = {|
  lat: number,
  lng: number,
|};

export type Radius = {|
  lat: number,
  lng: number,
  radius: number,
|};

export type Rectangle = {|
  topLeft: Coordinates,
  bottomRight: Coordinates,
|};

export type ExactLocation = {|
  location: string,
|};

export type RadiusLocation = {|
  radius: Radius,
|};

export type LocationVariants = ExactLocation | RadiusLocation;

export type Location = {|
  locationId: string,
  name: string,
  slug: string,
  timezone: string,
  location: Coordinates,
  type: string,
  city: ?LocationArea,
  subdivision: ?LocationArea,
  country: ?LocationArea,
|};

export type LocationArea = {|
  locationId: string,
  name: string,
  slug: string,
|};
