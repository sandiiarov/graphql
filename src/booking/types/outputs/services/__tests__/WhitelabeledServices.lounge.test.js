// @flow

import WhitelabeledServices from '../WhitelabeledServices';
import { evaluateResolver } from '../../../../../common/services/TestingTools';

const fields = WhitelabeledServices.getFields();

jest.mock('../../../../dataloaders/Lounges', () => ({
  loadMany: () => Promise.resolve([[{ iata: 'PRG' }], []]), // lounge is available only in PRG
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
  ).resolves.toEqual({
    departureTime: new Date(1),
    iataCodes: ['PRG'],
  });
});
