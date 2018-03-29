// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import rootCategory from '../../datasets/rootCategory.json';
import categories from '../../datasets/categories.json';
import FAQArticle39 from '../../datasets/FAQArticle-39.json';
import FAQArticle132 from '../../datasets/FAQArticle-132.json';
import FAQArticle136 from '../../datasets/FAQArticle-136.json';

describe('allFAQCategories', () => {
  beforeEach(() => {
    RestApiMock.onGet(
      'https://api.skypicker.com/knowledgebase/api/v1/categories',
    ).replyWithData(rootCategory);
    RestApiMock.onGet(
      'https://api.skypicker.com/knowledgebase/api/v1/categories/1',
    ).replyWithData(categories);
    RestApiMock.onGet(
      'https://api.skypicker.com/knowledgebase/api/v1/articles/136',
    ).replyWithData(FAQArticle136);
    RestApiMock.onGet(
      'https://api.skypicker.com/knowledgebase/api/v1/articles/132',
    ).replyWithData(FAQArticle132);
    RestApiMock.onGet(
      'https://api.skypicker.com/knowledgebase/api/v1/articles/39',
    ).replyWithData(FAQArticle39);
  });

  it('should return list of categories with subcategories and related FAQs', async () => {
    const resultsQuery = `{ 
      allFAQCategories(language: en) {
        edges {
          node {
            id
            title
            subcategories {
              id
            }
            FAQs {
              id
              title
              content
            }  
          }
        }
      }        
    }`;
    expect(await graphql(resultsQuery)).toMatchSnapshot();
  });
});
