import Flight from '../Flight';

describe('arrival field', () => {
  const arrival = Flight.getFields().arrival;
  it('should be non-null Arrival type', () => {
    expect(arrival.type.toString()).toBe('Arrival!');
  });
});

describe('departure field', () => {
  const departure = Flight.getFields().departure;
  it('should be non-null Departure string', () => {
    expect(departure.type.toString()).toBe('Departure!');
  });
});
