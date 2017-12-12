// @flow

import Dataloader from 'dataloader';
import { get } from '../../services/HttpRequest';
import Config from '../../../config/application';

import type { Airline as AirlineType } from '../Flight';

let airlinesCache = null;

type Airline = {
  name: string,
  id: string,
  lcc: string,
};

export default function createAirlineLoader() {
  airlinesCache = null;
  return new Dataloader((airlinesCodes: Array<string>) =>
    batchLoad(airlinesCodes),
  );
}

async function batchLoad(airlinesCodes): Promise<Array<?AirlineType | Error>> {
  const airlines = await fetchAirlines();
  return airlinesCodes.map(airlineCode => {
    const airline = airlines[airlineCode];
    return airline !== undefined ? createAirline(airline) : null;
  });
}

async function fetchAirlines() {
  if (!airlinesCache) {
    airlinesCache = get(Config.restApiEndpoint.airlines)
      // eslint-disable-next-line promise/prefer-await-to-then
      .then(airlines => {
        const cache: { [key: string]: Airline } = {};
        airlines.map((a: Airline) => (cache[a.id] = a));
        return cache;
      });
  }
  return airlinesCache;
}

function createAirline(airline: Airline): AirlineType {
  return {
    name: airline.name,
    code: airline.id,
    logoUrl: `https://images.kiwi.com/airlines/64/${airline.id}.png`,
    isLowCost: airline.lcc === '1',
  };
}
