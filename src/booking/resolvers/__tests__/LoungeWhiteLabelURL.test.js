// @flow

import LoungeWhiteLabelURLResolver from '../LoungeWhitelabelURL';

jest.mock('../../dataloaders/Lounges', () => ({
  load: key => {
    return Promise.resolve(
      key === 'PRG'
        ? [
            {
              airport: 'Vaclav Havel',
              terminal: 'Terminal 1',
              iata: 'PRG',
              lounge_name: 'Menzies Aviation Lounge',
              lounge_code: 'PRGAHAR',
              provider: 'collinsons',
            },
          ]
        : [
            {
              airport: 'Heathrow',
              terminal: 'Terminal 2',
              iata: 'LHR',
              lounge_name: 'Plaza Premium Lounge (3-6hr stay)',
              lounge_code: 'LHR2EXP',
              provider: 'collinsons',
            },
            {
              airport: 'London Heathrow',
              terminal: 'Terminal 3',
              iata: 'LHR',
              lounge_name: 'No. 1 Heathrow',
              lounge_code: 'null',
              provider: 'loungebuddy',
            },
          ],
    );
  },
}));

const FUTURE = new Date('4000-12-24');
const PAST = new Date('1000-12-24');

it('returns expected lounge URL - departure in the future', async () => {
  await expect(LoungeWhiteLabelURLResolver('PRG', FUTURE)).resolves.toBe(
    'https://www.loungepass.com/tp/kiwi/?airport=PRG',
  );
  await expect(LoungeWhiteLabelURLResolver('LHR', FUTURE)).resolves.toBe(
    'https://www.loungepass.com/tp/kiwi/?airport=LHR',
  );
});

it('returns expected lounge URL - departure in the past', async () => {
  // we cannot provide 'collinsons' because it's too late and there is no alternative
  await expect(LoungeWhiteLabelURLResolver('PRG', PAST)).resolves.toBeNull();

  // but LHR has 'loungebuddy' alternative
  await expect(LoungeWhiteLabelURLResolver('LHR', PAST)).resolves.toBe(
    'https://www.loungebuddy.com/LHR',
  );
});
