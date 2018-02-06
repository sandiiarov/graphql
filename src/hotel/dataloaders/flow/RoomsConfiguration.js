// @flow

export type RoomsConfiguration = Array<{|
  adultsCount: number,
  children?: Array<{|
    age: number,
  |}>,
|}>;
