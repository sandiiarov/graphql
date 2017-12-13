Production URL: https://graphql.kiwi.com/

This GraphQL API proxy is written for serverless infrastructure. This assumption is especially important in case of dataloaders. For more information please read: https://github.com/facebook/dataloader#caching-per-request

# Run GraphQL API server

Using this command you can run GraphQL API server with HMR (Hot Module Replacement).

```
yarn start
```

Server is running by default on `http://127.0.0.1:3000/`

# Run tests

```
yarn test
yarn test-ci
```

# Debug application

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

# Directory structure

```
src
├── booking
│    ├── queries
│    │    ├── AllBookings.js
│    │    └── SingleBooking.js
│    ├── mutations (if exists)
│    ├── dataloaders + API sanitizers
│    ├── types
│    │    ├── outputs
│    │    ├── inputs
│    │    └── enums
│    ├── resolvers (if exists)
│    └── datasets
├── flight
│    └── ditto
├── hotel
├── location
├── identity
└── common (contains shared services)
```

Motivations: there is point in time in every application where doing groups by generic "outputs" or "inputs" is not enough and it's becoming mess. For this reason it's better to group application parts by responsibilities. With this structure the project is less flat and more deep.

# Requirements of a Relay-compliant GraphQL server

- [Cursor Connections Specification](https://facebook.github.io/relay/graphql/connections.htm)
- [Global Object Identification Specification](https://facebook.github.io/relay/graphql/objectidentification.htm)
- [Input Object Mutations Specification](https://facebook.github.io/relay/graphql/mutations.htm)
