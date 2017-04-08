import { expect } from 'chai';
import { describe, it } from 'mocha';
import Booking from '../../src/types/Booking';

describe('Booking Type Test', () => {
  describe('Arrival Field', () => {
    const arrival = Booking.getFields().arrival;

    it('should be non nullable type', () => {
      expect(arrival.type.toString()).to.equal('Arrival!');
    });

    it('should resolve arrival field', () => {
      expect(
        arrival.resolve({
          arrival: 'aaa',
          departure: 'bbb',
        }),
      ).to.equal('aaa');
    });
  });

  describe('Departure Field', () => {
    const departure = Booking.getFields().departure;

    it('should be non nullable type', () => {
      expect(departure.type.toString()).to.equal('Departure!');
    });

    it('should resolve departure field', () => {
      expect(
        departure.resolve({
          arrival: 'aaa',
          departure: 'bbb',
        }),
      ).to.equal('bbb');
    });
  });

  describe('Flights Field', () => {
    it('should be non nullable list type', () => {
      expect(Booking.getFields().flights.type.toString()).to.equal('[Flight!]');
    });
  });
});
