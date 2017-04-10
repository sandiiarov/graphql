import Booking from '../Booking';

describe('arrival field', () => {
  const arrival = Booking.getFields().arrival;
  it('should be non nullable type', () => {
    expect(arrival.type.toString()).toBe('Arrival!');
  });
});

describe('departure field', () => {
  const departure = Booking.getFields().departure;
  it('should be non nullable type', () => {
    expect(departure.type.toString()).toBe('Departure!');
  });
});

describe('flights field', () => {
  const flights = Booking.getFields().flights;
  it('should be non nullable list of non nullable types', () => {
    expect(flights.type.toString()).toBe('[Flight!]!');
  });
});
