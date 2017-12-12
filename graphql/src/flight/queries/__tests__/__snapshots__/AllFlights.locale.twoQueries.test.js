// @flow

import { graphql, RestApiMock } from '../../../../common/services/TestingTools';
import config from '../../../../../config/application';
import PrgMexCsCzDataset from '../../../datasets/prg-mex-cs-CZ.json';
import PragueDataset from '../../../../location/datasets/prague.json';
import MexicoDataset from '../../../../location/datasets/mexico.json';

/*
 * Location datasets have to be different to recognize both requests were called with proper locale.
 */
beforeEach(() => {
  RestApiMock.onGet(
    config.restApiEndpoint.allFlights({
      flyFrom: 'PRG',
      to: 'MEX',
      dateFrom: '08/08/2017',
      dateTo: '08/09/2017',
      locale: 'de',
    }),
  ).replyWithData(PrgMexCsCzDataset);

  RestApiMock.onGet(
    config.restApiEndpoint.allFlights({
      flyFrom: 'PRG',
      to: 'MEX',
      dateFrom: '08/08/2017',
      dateTo: '08/09/2017',
      locale: 'es',
    }),
  ).replyWithData(PrgMexCsCzDataset);

  RestApiMock.onGet(
    config.restApiEndpoint.allLocations({ term: 'PRG', locale: 'de-DE' }),
  ).replyWithData(PragueDataset);

  RestApiMock.onGet(
    config.restApiEndpoint.allLocations({ term: 'PRG', locale: 'es-ES' }),
  ).replyWithData(MexicoDataset);
});

describe('AllFlights locale ', () => {
  it('should request flights and locations with proper locale', async () => {
    const query = `
    fragment departure on Flight {
      departure {
        airport {
          name
          city {
            name
          }
        }
      }
    }
    query (
      $input: FlightsSearchInput!,
      $options: FlightsOptionsInput,
      $input2: FlightsSearchInput!,
      $options2: FlightsOptionsInput
    ) {
      allFlights(search: $input, options: $options) {
        edges {
          cursor
          node {
            ...departure
          }
        }
      }
      flights2: allFlights(search: $input2, options: $options2) {
        edges {
          cursor
          node {
            ...departure
          }
        }
      }
    }`;
    const variables = {
      input: {
        from: { location: 'PRG' },
        to: { location: 'MEX' },
        date: {
          from: '2017-08-08',
          to: '2017-09-08',
        },
      },
      options: { locale: 'de_DE' },
      input2: {
        from: { location: 'PRG' },
        to: { location: 'MEX' },
        date: {
          from: '2017-08-08',
          to: '2017-09-08',
        },
      },
      options2: { locale: 'es_ES' },
    };
    expect(await graphql(query, variables)).toMatchSnapshot();
  });
});
