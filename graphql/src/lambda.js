import { graphql } from 'graphql';
import schema from './Schema';
import { createContext } from './services/GraphqlContext';

const createSuccessResponse = rawBody => ({
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*', // Required for CORS
  },
  body: JSON.stringify(rawBody),
});

const createErrorResponse = error => ({
  statusCode: 500,
  headers: {
    'Access-Control-Allow-Origin': '*', // Required for CORS
  },
  body: JSON.stringify({
    errors: [
      {
        message: error,
      },
    ],
  }),
});

exports.graphql = async (event, context, callback) => {
  let body = null;

  try {
    body = JSON.parse(event.body);
  } catch (error) {
    callback(
      null,
      createErrorResponse(
        'Request body should contain only valid JSON in the following format: {"query":"{__schema{types{name}}}"}',
      ),
    );
    return;
  }

  if (body.query === undefined) {
    callback(
      null,
      createErrorResponse('Requested body doesn\'t contain "query" field.'),
    );
    return;
  }

  const token = event.headers.authorization || event.headers.Authorization;
  const variables = body.variables || null;

  try {
    const response = await graphql(
      schema,
      body.query,
      null,
      createContext(token),
      variables,
    );
    callback(null, createSuccessResponse(response));
  } catch (error) {
    callback(null, createErrorResponse(error));
  }
};
