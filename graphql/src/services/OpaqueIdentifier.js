// @flow

type Base64String = string;

function base64(input: string): Base64String {
  return new Buffer(input, 'utf8').toString('base64');
}

function unbase64(input: Base64String): string {
  return new Buffer(input, 'base64').toString('utf8');
}

function required() {
  throw new Error('Missing required parameter.');
}

/**
 * Takes a type name and an ID specific to that type name, and returns a
 * "global ID" that is unique among all types.
 *
 * This function is taken from Relay.
 */
export function toGlobalId(
  type: ?string,
  id: string | number = required(),
): Base64String {
  return base64([type, id].join(':'));
}

type ResolvedGlobalId = {
  type: string,
  id: string,
};

/**
 * Takes the "global ID" created by toGlobalId, and returns the type name and ID
 * used to create it.
 *
 * This function is taken from Relay.
 */
export function fromGlobalId(
  globalId: Base64String = required(),
): ResolvedGlobalId {
  const unbasedGlobalId = unbase64(globalId);
  const delimiterPos = unbasedGlobalId.indexOf(':');
  return {
    type: unbasedGlobalId.substring(0, delimiterPos),
    id: unbasedGlobalId.substring(delimiterPos + 1),
  };
}
