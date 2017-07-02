// @flow

export type Login = {|
  token: string,
  userId: string,
|};

export type Identity = {|
  email: string,
  emailVerified: boolean,
  firstName: ?string,
  lastName: ?string,
  login: string,
  userId: string,
|};
