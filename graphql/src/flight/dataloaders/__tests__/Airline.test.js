// @flow

import { RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';
import AirlinesDataset from '../../datasets/airlines.json';
import createAirlineLoader from '../Airline';

RestApiMock.onGet(config.restApiEndpoint.airlines).replyWithData(
  AirlinesDataset,
);

describe('Airline dataloader', () => {
  it('should load airlines', async () => {
    const airlineLoader = createAirlineLoader();
    const airline = await airlineLoader.load('OK');
    expect(airline).toMatchSnapshot();
  });

  it('should load null for unknown airline', async () => {
    const airlineLoader = createAirlineLoader();
    const airline = await airlineLoader.load('NONE');
    expect(airline).toMatchSnapshot();
  });
});
