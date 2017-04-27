import { executeQuery } from '../../services/TestingTools';
import AllPlaces from '../AllPlaces';

describe('all places query', () => {
  it('should be non-null list of non-null Place types', () => {
    expect(AllPlaces.type.toString()).toBe('[Place!]!');
  });

  it('should return array of places', async () => {
    const placesQuery = `{
      allPlaces {
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
});
