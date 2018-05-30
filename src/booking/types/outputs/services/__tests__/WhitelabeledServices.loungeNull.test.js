// @flow

import WhitelabeledServices from '../WhitelabeledServices';
import { evaluateResolver } from '../../../../../common/services/TestingTools';

const fields = WhitelabeledServices.getFields();

jest.mock('../../../../dataloaders/Lounges', () => ({
  loadMany: () => Promise.resolve([[], []]),
}));

it('returns null for no relevant airports', async () => {
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
      { departureTime: new Date() },
    ),
  ).resolves.toBeNull();
});
