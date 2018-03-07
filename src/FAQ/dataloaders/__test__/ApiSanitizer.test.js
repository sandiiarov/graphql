// @flow

import { sanitizeFAQ } from '../ApiSanitizer';
import priceFAQDataset from '../../datasets/FAQ-price.json';

describe('Sanitize list of results', () => {
  it('should work', async () => {
    const resultsFAQ = priceFAQDataset.map(sanitizeFAQ);
    expect(resultsFAQ).toMatchSnapshot();
  });
  it('should load titles', async () => {
    const resultFAQ = priceFAQDataset.map(sanitizeFAQ)[0];
    const title = resultFAQ.title;
    expect(title).toBe('How can Price Alerts save me time and money?');
  });
});
