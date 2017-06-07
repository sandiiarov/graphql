// @flow

import createAirlineLoader from '../Airline';

jest.mock('../../services/HttpRequest');

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
