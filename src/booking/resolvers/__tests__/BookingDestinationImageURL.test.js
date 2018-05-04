// @flow

import resolver, { getCityId, castURL } from '../BookingDestinationImageURL';

describe('resolver', () => {
  it('resolves image URL for oneway trip', () => {
    expect(
      resolver(
        // $FlowExpectedError: full Booking object is not needed for this test
        {
          type: 'BookingOneWay',
          legs: [
            { arrival: { where: { cityId: 'AAA' } } },
            { arrival: { where: { cityId: 'BBB' } } },
            { arrival: { where: { cityId: 'CCC' } } },
          ],
        },
        {
          dimensions: '11x22',
        },
      ),
    ).toBe('https://images.kiwi.com/photos/11x22/CCC.jpg');
  });

  it('resolves image URL for return trip', () => {
    expect(
      resolver(
        // $FlowExpectedError: full Booking object is not needed for this test
        {
          type: 'BookingReturn',
          legs: [
            { arrival: { where: { cityId: 'AAA' } } },
            { arrival: { where: { cityId: 'BBB' } } },
            { arrival: { where: { cityId: 'CCC' } }, isReturn: true },
          ],
        },
        {
          dimensions: '22x33',
        },
      ),
    ).toBe('https://images.kiwi.com/photos/22x33/BBB.jpg');
  });

  it('resolves image URL for multicity trip', () => {
    expect(
      resolver(
        // $FlowExpectedError: full Booking object is not needed for this test
        {
          type: 'BookingMulticity',
          segments: [],
          legs: [
            { arrival: { where: { cityId: 'AAA' } } },
            { arrival: { where: { cityId: 'BBB' } } },
            { arrival: { where: { cityId: 'CCC' } } },
          ],
        },
        {
          dimensions: '33x44',
        },
      ),
    ).toBe('https://images.kiwi.com/photos/33x44/CCC.jpg');
  });
});

describe('getCityId', () => {
  it('returns city ID', () => {
    expect(
      getCityId([
        { arrival: { where: { cityId: 'AAA' } } },
        { arrival: { where: { cityId: 'BBB' } } },
        { arrival: { where: { cityId: 'CCC' } } },
      ]),
    ).toBe('CCC');
  });
});

describe('castURL', () => {
  it('casts correct URL', () => {
    expect(castURL('123x456', 'AAA')).toBe(
      'https://images.kiwi.com/photos/123x456/AAA.jpg',
    );
    expect(castURL('22x33', 'BBB')).toBe(
      'https://images.kiwi.com/photos/22x33/BBB.jpg',
    );
  });
});
