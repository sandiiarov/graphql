// @flow

import resolver, { getCityId, castURL } from '../BookingDestinationImageURL';

const DATE_PAST = new Date('1990-12-24');
const DATE_FUTURE = new Date('4000-12-24');

describe('resolver', () => {
  it('resolves image URL for oneway trip', () => {
    expect(
      resolver(
        // $FlowExpectedError: full Booking object is not needed for this test
        {
          type: 'BookingOneWay',
          arrival: {
            when: {
              utc: DATE_PAST,
            },
          },
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
    ).toBe('https://images.kiwi.com/photos/11x22/CCC.grayscale.jpg');
  });

  it('resolves image URL for return trip', () => {
    expect(
      resolver(
        // $FlowExpectedError: full Booking object is not needed for this test
        {
          type: 'BookingReturn',
          arrival: {
            when: {
              utc: DATE_FUTURE,
            },
          },
          outbound: {
            legs: [
              { arrival: { where: { cityId: 'AAA' } } },
              { arrival: { where: { cityId: 'BBB' } } },
            ],
          },
          inbound: {
            legs: [{ arrival: { where: { cityId: 'CCC' } }, isReturn: true }],
          },
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
          arrival: {
            when: {
              utc: DATE_PAST,
            },
          },
          segments: [],
          trips: [
            {
              legs: [
                { arrival: { where: { cityId: 'AAA' } } },
                { arrival: { where: { cityId: 'BBB' } } },
                { arrival: { where: { cityId: 'CCC' } } },
              ],
            },
          ],
        },
        {
          dimensions: '33x44',
        },
      ),
    ).toBe('https://images.kiwi.com/photos/33x44/CCC.grayscale.jpg');
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
    expect(castURL('123x456', 'AAA', false)).toBe(
      'https://images.kiwi.com/photos/123x456/AAA.jpg',
    );
    expect(castURL('22x33', 'BBB', true)).toBe(
      'https://images.kiwi.com/photos/22x33/BBB.grayscale.jpg',
    );
  });
});
