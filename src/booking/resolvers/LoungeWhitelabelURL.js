// @flow

import { DateTime } from 'luxon';

import LoungesDataloader from '../dataloaders/Lounges';

export default async function LoungeWhiteLabelURLResolver(
  iataCode: string,
  departureTime?: Date = new Date(),
): Promise<string | null> {
  try {
    const availableLounges = (await LoungesDataloader.load(
      iataCode,
    )).reduce(
      (acc, curVal) => {
        acc[curVal.provider].push(curVal);
        return acc;
      },
      ({
        loungebuddy: [],
        collinsons: [],
      }: Object),
    );

    const diff = DateTime.fromJSDate(departureTime)
      .diff(DateTime.fromJSDate(new Date()), 'hours')
      .toObject().hours;

    // more than 24 hours to the departure? use 'collinsons' otherwise 'loungebuddy' (if available)
    if (diff > 24 && availableLounges.collinsons.length > 0) {
      return `https://www.loungepass.com/tp/kiwi/?airport=${iataCode}`;
    } else if (availableLounges.loungebuddy.length > 0) {
      return `https://www.loungebuddy.com/${iataCode}`;
    }

    return null;
  } catch (error) {
    return null;
  }
}
