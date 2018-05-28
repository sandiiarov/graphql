// @flow

import DataLoader from 'dataloader';

import { fetchJson } from '../../common/services/JsonFetcher';

type SupportedProviders = 'collinsons' | 'loungebuddy';

type LoungeInfoTypeIn = {|
  +airport: string,
  +terminal: string,
  +iata: string,
  +lounge_name: string,
  +lounge_code: string,
  +provider: SupportedProviders,
|};

type LoungeInfoTypeOut = {|
  +airport: string,
  +terminal: string,
  +iata: string,
  +loungeName: string,
  +loungeCode: string,
  +provider: SupportedProviders,
|};

export default new DataLoader(async (keys: $ReadOnlyArray<string>): Promise<
  $ReadOnlyArray<LoungeInfoTypeOut[]>,
> => {
  const stringifiedKeys = keys.join(',');

  // [
  //   {
  //     "airport": "Vaclav Havel",
  //     "terminal": "Terminal 1",
  //     "iata": "PRG",
  //     "lounge_name": "Menzies Aviation Lounge",
  //     "lounge_code": "PRGAHAR",
  //     "provider": "collinsons" | "loungebuddy"
  //   },
  //   ...
  // ]
  const availableLounges = (await fetchJson(
    `https://lounges-api.skypicker.com/lounge?iata=${stringifiedKeys}`,
  ): $ReadOnlyArray<LoungeInfoTypeIn>);

  return keys.map(key => {
    return availableLounges
      .filter(lounge => lounge.iata === key)
      .map(lounge => ({
        airport: lounge.airport,
        terminal: lounge.terminal,
        iata: lounge.iata,
        loungeName: lounge.lounge_name,
        loungeCode: lounge.lounge_code,
        provider: lounge.provider,
      }));
  });
});
