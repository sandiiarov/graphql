import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import priceFAQDataset from '../../datasets/FAQ-price.json';

beforeEach(() => {
  RestApiMock.onGet(
    'https://api.skypicker.com/knowledgebase/api/v1/search?q=price',
  ).replyWithData(priceFAQDataset);
});

describe('search query', () => {
  it('should return valid results field', async () => {
    const resultsQuery = `{
      allFAQs(search:"price", language: en){
        edges{
          node{
            results {
              id
              title
              content
              upvotes
              downvotes
              categories {
                id
                name
                items {
                  id
                  title
                  style
                  icon
                }
              }
            }
          } 
        }
      }
    }`;
    expect(await graphql(resultsQuery)).toMatchSnapshot();
  });
});
