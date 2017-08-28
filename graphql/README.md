Production URL: https://graphql.kiwi.com/

## Run GraphQL API server

Using this command you can run GraphQL API server with HMR (Hot Module Replacement).

```
yarn start
```

Server is running by default on `http://127.0.0.1:3000/`

## Run tests

```
yarn test
yarn test-ci
```

## Debug application

First you need to run `debug` command. This is very similar to the `start` command except it doesn't start server. It only watches changes because of HMR and generates source-maps for JS code.

```
yarn debug
```

Now you have two options. You can fire up debugger by itself:

```
node --inspect=127.0.0.1:65454 dist/endpoint.js
```

You'll get `chrome-devtools://` URL where you can discover network targets or use this URL: `chrome://inspect/#devices`. The better way is to use your IDE. You just have to configure the JavaScript file to the `endpoint.js`.

Second option is recommended but the first one works everytime on chrome based browsers.

## Directory structure

```
src
├── dataLoaders         (for data loading)
├── datasets            (responses from backend REST API)
├── inputs              (GraphQLInputObjectTypes)
├── mutations           (GraphQL mutations)
├── outputs             (GraphQLObjectTypes)
├── queries             (GraphQL queries)
├── resolvers           (more complicated GraphQL resolvers)
├── services            (system functions and classes)
└── types               (internal Flow types definition)
```
