// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import config from '../../../../config/application';
import PrgMexCsCzDataset from '../../datasets/prg-mex-cs-CZ.json';
import NoFlightsDataset from '../../datasets/no-results.json';
import PragueCsCzDataset from '../../../location/datasets/prague-cs-CZ.json';
import MexCsCzDataset from '../../../location/datasets/mex-cs-CZ.json';

beforeEach(() => {
  RestApiMock.onGet(
    config.restApiEndpoint.allFlights({
      flyFrom: 'PRG',
      to: 'MEX',
      dateFrom: '08/08/2017',
      dateTo: '08/09/2017',
      locale: 'cz',
    }),
  ).replyWithData(PrgMexCsCzDataset);

  RestApiMock.onGet(
    config.restApiEndpoint.allFlights({
      flyFrom: 'Praha',
      to: 'MEX',
      dateFrom: '08/08/2017',
      dateTo: '08/09/2017',
      locale: 'cz',
    }),
  ).replyWithData(NoFlightsDataset);

  RestApiMock.onGet(
    config.restApiEndpoint.allFlights({
      flyFrom: 'prague_cz',
      to: 'MEX',
      dateFrom: '08/08/2017',
      dateTo: '08/09/2017',
      locale: 'cz',
    }),
  ).replyWithData(PrgMexCsCzDataset);

  ['PRG', 'Praha'].forEach(location => {
    RestApiMock.onGet(
      config.restApiEndpoint.allLocations({
        term: location,
        locale: 'cs-CZ',
      }),
    ).replyWithData(PragueCsCzDataset);
  });

  RestApiMock.onGet(
    config.restApiEndpoint.allLocations({ term: 'MEX', locale: 'cs-CZ' }),
  ).replyWithData(MexCsCzDataset);
});

describe('all flights query', () => {
  it('should return flight in czech language', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!, $options: FlightsOptionsInput) {
      allFlights(search: $input, options: $options) {
        edges {
          node {
            departure { airport { city { name }}}
            arrival { airport { city { name }}}
          }
        }
      }
    }`;
    const variables = {
      input: {
        from: {
          location: 'PRG',
        },
        to: {
          location: 'MEX',
        },
        date: {
          from: '2017-08-08',
          to: '2017-09-08',
        },
      },
      options: {
        locale: 'cs_CZ',
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });

  it('should return flight in czech language with location fallback', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!, $options: FlightsOptionsInput) {
      allFlights(search: $input, options: $options) {
        edges {
          node {
            departure { airport { city { name }}}
            arrival { airport { city { name }}}
          }
        }
      }
    }`;
    const variables = {
      input: {
        from: {
          location: 'Praha',
        },
        to: {
          location: 'MEX',
        },
        date: {
          from: '2017-08-08',
          to: '2017-09-08',
        },
      },
      options: {
        locale: 'cs_CZ',
      },
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });
});
