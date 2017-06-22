// @flow

import { RestApiMock } from '../../services/TestingTools';
import config from '../../../config/application';
import { Airline } from '../../datasets';
import createAirlineLoader from '../Airline';

RestApiMock.onGet(config.restApiEndpoint.airlines).replyWithData(Airline.all);

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
