import Departure from '../Departure';

describe('airport field', () => {
  const airport = Departure.getFields().airport;
  it('should be non-null Airport type', () => {
    expect(airport.type.toString()).toBe('Airport!');
  });
});
