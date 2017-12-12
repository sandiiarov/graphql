// @flow

import { graphql, RestApiMock } from '../../../../common/services/TestingTools';
import config from '../../../../../config/application';
import PrgMexDataset from '../../../datasets/prg-mex.json';
import AirlinesDataset from '../../../datasets/airlines.json';

RestApiMock.onGet(
  config.restApiEndpoint.allFlights({
    flyFrom: 'PRG',
    to: 'MEX',
    dateFrom: '08/08/2017',
    dateTo: '08/09/2017',
  }),
).replyWithData(PrgMexDataset);

RestApiMock.onGet(config.restApiEndpoint.airlines).replyWithData(
  AirlinesDataset,
);

describe('all flights query', () => {
  it('should return array of flights', async () => {
    const allFlightsSearchQuery = `
    query ($input: FlightsSearchInput!) {
      allFlights(search: $input) {
        edges {
          node {
            airlines {
              name
              code
              logoUrl
              isLowCost
            }
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
    };
    expect(await graphql(allFlightsSearchQuery, variables)).toMatchSnapshot();
  });
});
