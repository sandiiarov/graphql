import Booking from '../Booking';

describe('id field', () => {
  const id = Booking.getFields().id;
  it('should be non-null ID type', () => {
    expect(id.type.toString()).toBe('ID!');
  });
});

describe('databaseId field', () => {
  const databaseId = Booking.getFields().databaseId;
  it('should be non-null Int type', () => {
    expect(databaseId.type.toString()).toBe('Int!');
  });
});

describe('arrival field', () => {
  const arrival = Booking.getFields().arrival;
  it('should be non-null Arrival type', () => {
    expect(arrival.type.toString()).toBe('Arrival!');
  });
});

describe('departure field', () => {
  const departure = Booking.getFields().departure;
  it('should be non-null Departure type', () => {
    expect(departure.type.toString()).toBe('Departure!');
  });
});

describe('flights field', () => {
  const flights = Booking.getFields().flights;
  it('should be non-null list of non-null Flight types', () => {
    expect(flights.type.toString()).toBe('[Flight!]!');
  });
});
