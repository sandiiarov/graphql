// @flow

import { executeQuery } from '../../services/TestingTools';
import AllPlaces from '../AllPlaces';

describe('all places search query', () => {
  it('should be non-null list of non-null Place types', () => {
    expect(AllPlaces.type.toString()).toBe('[Place!]!');
  });

  it('should return array of places', async () => {
    const placesQuery = `{
      allPlaces(search: "nyt") {
        id
        name
        numberOfAirports
        population
        location {
          latitude
          longitude
        }
      }
    }`;
    expect(await executeQuery(placesQuery)).toMatchSnapshot();
  });

  it('should return array even though there is no result available', async () => {
    const placesQuery = `{
      allPlaces(search: "unknown place") {
        id
      }
    }`;
    expect(await executeQuery(placesQuery)).toMatchSnapshot();
  });
});
