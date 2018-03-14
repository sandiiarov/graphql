// @flow

import using from 'jasmine-data-provider';
import parse from '../SlugRadiusParser';

describe('SlugRadius parser', () => {
  describe('should parse', () => {
    const dataProvider = () => [
      {
        slugRadius: 'bratislava-slovakia-169km',
        expected: { slug: 'bratislava-slovakia', radius: 169 },
      },
      {
        slugRadius: '56.25-19.42-250km',
        expected: { gps: { lat: 56.25, lng: 19.42 }, radius: 250 },
      },
      {
        slugRadius: '56.25--19.42-250km',
        expected: { gps: { lat: 56.25, lng: -19.42 }, radius: 250 },
      },
      {
        slugRadius: '-56.25-19.42-250km',
        expected: { gps: { lat: -56.25, lng: 19.42 }, radius: 250 },
      },
      {
        slugRadius: '-56.25--19.42-250km',
        expected: { gps: { lat: -56.25, lng: -19.42 }, radius: 250 },
      },
      {
        slugRadius: '50-14-110km',
        expected: { gps: { lat: 50, lng: 14 }, radius: 110 },
      },
      {
        slugRadius: '50--14-110km',
        expected: { gps: { lat: 50, lng: -14 }, radius: 110 },
      },
      {
        slugRadius: '-50-14-110km',
        expected: { gps: { lat: -50, lng: 14 }, radius: 110 },
      },
      {
        slugRadius: '-50--14-110km',
        expected: { gps: { lat: -50, lng: -14 }, radius: 110 },
      },
    ];

    using(dataProvider, ({ slugRadius, expected }) => {
      it(slugRadius, () => {
        const parsed = parse(slugRadius);

        expect(parsed).toEqual(expected);
      });
    });
  });

  describe('should throw Error on', () => {
    const dataProvider = () => [
      {
        slugRadius: 'bratislava-slovakia',
        expected: { error: 'Error parsing radius. Input: bratislava-slovakia' },
      },
      {
        slugRadius: '120km',
        expected: { error: 'Error parsing radius. Input: 120km' },
      },
      {
        slugRadius: '45.12-110km',
        expected: { error: 'Error parsing location. Input: ' },
      },
      {
        slugRadius: '',
        expected: { error: 'Error parsing radius. Input: ' },
      },
      {
        slugRadius: '-0km',
        expected: { error: 'Error parsing radius. Input: -0km' },
      },
    ];

    using(dataProvider, ({ slugRadius, expected }) => {
      it(slugRadius, () => {
        expect(() => parse(slugRadius)).toThrowError(expected.error);
      });
    });
  });
});
