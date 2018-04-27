// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';
import Location from '../Location';
import PragueDataset from '../../datasets/prague.json';
import PragueCzDataset from '../../datasets/prague-cs-CZ.json';
import UnknownDataset from '../../datasets/unknown.json';

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({
    type: 'id',
    id: 'PRG',
    locale: 'en-US',
  }),
).replyWithData(PragueDataset);

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({
    type: 'id',
    id: 'PRG',
    locale: 'cs-CZ',
  }),
).replyWithData(PragueCzDataset);

RestApiMock.onGet(
  config.restApiEndpoint.allLocations({
    type: 'id',
    id: 'unknown_id',
    locale: 'en-US',
  }),
).replyWithData(UnknownDataset);

describe('location query', () => {
  it('should of type location', () => {
    expect(Location.type.toString()).toBe('Location');
  });

  it('should return location', async () => {
    const query = `{
      location(id: "PRG") {
        locationId
        name
        slug
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });

  it('should return location in Czech', async () => {
    const query = `{
      location(id: "PRG", locale: cs_CZ) {
        locationId
        name
        slug
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });

  it('should return error on unknown location', async () => {
    const query = `{
      location(id: "unknown_id") {
        locationId
        name
        slug
      }
    }`;
    expect(await graphql(query)).toMatchSnapshot();
  });
});
