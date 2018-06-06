// @flow

import CustomerSupport from '../types/output/CustomerSupport';

export default {
  type: CustomerSupport,
  description: 'Customer support related data.',
  resolve: () => true, // we are going to fetch data here from the API
};
