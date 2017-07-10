// @flow

export type DateFromType = {|
  exact?: Date,
  range?: {| from: Date, to: Date |},
  anytime?: boolean,
|};

export type DateToType = {|
  exact?: Date,
  range?: {| from: Date, to: Date |},
  anytime?: boolean,
  timeToStay?: {| from: number, to: number |},
|};
