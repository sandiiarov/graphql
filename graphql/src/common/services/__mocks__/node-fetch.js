// @flow

import url from 'url';

export default function(
  absoluteUrl: string,
  options?: Object = {},
): Promise<Object> {
  const parsedUrl: Object = url.parse(absoluteUrl, true);
  const response = {
    status: parsedUrl.query.status || 200,
    statusText: 'Status Text',
    json: () => ({
      url: absoluteUrl,
      options,
    }),
  };
  return new Promise(resolve => resolve(response));
}
