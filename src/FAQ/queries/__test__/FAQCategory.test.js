// @flow

import { graphql, RestApiMock } from '../../../common/services/TestingTools';
import rootCategory from '../../datasets/rootCategory.json';
import categories from '../../datasets/categories.json';

describe('allFAQCategories', () => {
  beforeEach(() => {
    RestApiMock.onGet(
      'https://api.skypicker.com/knowledgebase/api/v1/categories',
    ).replyWithData(rootCategory);
    RestApiMock.onGet(
      'https://api.skypicker.com/knowledgebase/api/v1/categories/1',
    ).replyWithData(categories);
  });

  it('should return single FAQ category', async () => {
    const id = 'RkFRQ2F0ZWdvcnk6NDc=';
    const resultsQuery = `query FAQSubcategories($id: ID!) { 
      FAQCategory(language: en, id: $id) {
        id
        title
        subcategories {
          id
        }
        FAQs {
          id
          title
        }  
      }      
    }`;
    expect(await graphql(resultsQuery, { id })).toMatchSnapshot();
  });

  it('should return error for non-existing category', async () => {
    const id = 'RkFRQ2F0ZWdvcnk6NjY2'; // non-existing category #666
    const resultsQuery = `query FAQSubcategories($id: ID!) { 
      FAQCategory(language: en, id: $id) {
        id
      }        
    }`;
    expect(await graphql(resultsQuery, { id })).toMatchSnapshot();
  });
});
