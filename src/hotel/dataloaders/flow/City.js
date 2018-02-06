// @flow

type Coordinates = {|
  longitude: string,
  latitude: string,
|};

export type City = {|
  id: string,
  name: string,
  location: Coordinates,
|};
