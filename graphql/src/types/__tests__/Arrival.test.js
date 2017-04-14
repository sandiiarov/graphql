import Arrival from '../Arrival';

describe('airport field', () => {
  const airport = Arrival.getFields().airport;
  it('should be non-null Airport type', () => {
    expect(airport.type.toString()).toBe('Airport!');
  });
});
