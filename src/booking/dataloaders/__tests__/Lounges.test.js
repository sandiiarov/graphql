// @flow

import LoungesDataloader from '../Lounges';

// intentionally simplified
const mockDatasetPRG = [
  {
    airport: 'Vaclav Havel',
    terminal: 'Terminal 1',
    iata: 'PRG',
    lounge_name: 'Menzies Aviation Lounge',
    lounge_code: 'PRGAHAR',
    provider: 'collinsons',
  },
];

// intentionally simplified
const mockDatasetLHR = [
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
];

jest.mock('../../../common/services/JsonFetcher', () => ({
  fetchJson: url => {
    switch (url) {
      case 'https://lounges-api.skypicker.com/lounge?iata=PRG,LHR,unknown':
        return Promise.resolve(mockDatasetPRG.concat(mockDatasetLHR));
      default:
        throw new Error(`No mock data for: ${url}`);
    }
  },
}));

it('loads lounges correctly', async () => {
  // this must be first
  await expect(
    LoungesDataloader.loadMany(['PRG', 'LHR', 'unknown']),
  ).resolves.toMatchSnapshot();

  // these should be already loaded
  await expect(LoungesDataloader.load('PRG')).resolves.toMatchSnapshot();
  await expect(LoungesDataloader.load('LHR')).resolves.toMatchSnapshot();
});
