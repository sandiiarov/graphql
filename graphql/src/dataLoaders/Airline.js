// @flow

import airlines from '../types/Airlines.json';
import AirlineType from '../types/Airline';

export function createAirline(airlineCode: string): AirlineType {
  const airline = airlines.find(airline => airline.id === airlineCode);
  return {
    name: airline.name,
    code: airlineCode,
    logoUrl: `https://images.kiwi.com/airlines/64/${airlineCode}.png`,
    isLowCost: airline.lcc === '1',
  };
}
