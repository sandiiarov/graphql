// @flow

import WhitelabeledServices from '../WhitelabeledServices';
import { evaluateResolver } from '../../../../../common/services/TestingTools';

const fields = WhitelabeledServices.getFields();

jest.mock('../../../../dataloaders/AvailableLounges', () => ({
  loadMany: () =>
    // lounge is available only in PRG
    Promise.resolve([
      {
        iata: 'PRG',
        additionalInfo: 'oh yes',
      },
      null,
    ]),
}));

it('only the relevant airports', async () => {
  await expect(
    evaluateResolver(
      fields.lounge,
      {
        booking: {
          legs: [
            {
              departure: { where: { code: 'PRG' } },
              arrival: { where: { code: 'LHR' } },
            },
          ],
        },
      },
      { departureTime: new Date(1) },
    ),
  ).resolves.toEqual([
    {
      additionalInfo: 'oh yes',
      iata: 'PRG',
    },
  ]);
});
