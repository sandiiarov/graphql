// @flow

/**
 * This exception is thrown if origin server does NOT respond with HTTP status code 200.
 */
function ProxiedError(
  message: string,
  originStatusCode: number | string,
  originUrl: string,
) {
  this.name = 'ProxiedError';
  this.message = message;
  this.originStatusCode = Number(originStatusCode);
  this.originUrl = originUrl;
  this.stack = new Error().stack;
  return this;
}
ProxiedError.prototype = Object.create(Error.prototype);
ProxiedError.prototype.constructor = ProxiedError;

export { ProxiedError };
