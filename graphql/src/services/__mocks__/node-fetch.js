// @flow

import url from 'url';

export default function(absoluteUrl: string) {
  const parsedUrl: Object = url.parse(absoluteUrl, true);
  const response = {
    status: parsedUrl.query.status || 200,
    statusText: 'Status Text',
    json: () => ({
      url: absoluteUrl,
    }),
  };
  return new Promise(resolve => resolve(response));
}
