// @flow

export type CurrencyDetail = {|
  id: string,
  code: string,
  name: string,
  format: string,
  uncertainFormat: boolean,
  round: number,
  enabledOnAffilId: string[],
  fallback: string,
  rate: number,
|};

export type CurrencyDetails = { [id: string]: CurrencyDetail };
