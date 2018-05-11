// @flow

import { commonFields } from '../BookingInterface';
import config from '../../../../../config/application';
import AirlinesDataset from '../../../../flight/datasets/airlines.json';
import { RestApiMock } from '../../../../common/services/TestingTools';
import { createContext } from '../../../../common/services/GraphqlContext';

describe('BookingInterface.carriers', () => {
  beforeEach(() => {
    RestApiMock.onGet(config.restApiEndpoint.airlines).replyWithData(
      AirlinesDataset,
    );
  });

  const legs = [
    { airlineCode: 'FR' },
    { airlineCode: 'FR' },
    { airlineCode: 'FLIXBUS' },
  ];

  it('returns unique list of carriers', async () => {
    const context = createContext();
    // $FlowExpectedError: full Leg object is not needed for this test
    const carriers = await commonFields.carriers.resolve({ legs }, {}, context);

    expect(Array.from(carriers)).toEqual([
      {
        code: 'FR',
        isLowCost: true,
        name: 'Ryanair',
      },
      {
        code: 'FLIXBUS',
        isLowCost: false,
        name: 'Flixbus',
      },
    ]);
  });
});
