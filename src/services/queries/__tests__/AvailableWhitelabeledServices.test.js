// @flow

import { validate } from '../../../common/services/TestingTools';

it('works without errors', async () => {
  expect(
    validate(`{
      availableWhitelabeledServices(iataCode: "PRG") {
        lounge(departureTime: "2007-12-03T10:15:30Z") {
          whitelabelURL
        }
      }
    }`),
  ).toEqual([]);
});

it('requires valid IATA code', async () => {
  expect(
    validate(`{
      availableWhitelabeledServices {
        lounge(departureTime: "2007-12-03T10:15:30Z") {
          whitelabelURL
        }
      }
    }`),
  ).toMatchSnapshot();

  expect(
    validate(`{
      availableWhitelabeledServices(iataCode: 21) {
        lounge(departureTime: "2007-12-03T10:15:30Z") {
          whitelabelURL
        }
      }
    }`),
  ).toMatchSnapshot();
});
