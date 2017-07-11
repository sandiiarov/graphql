// @flow

module.exports.Booking = {
  all: require('./booking/AllBookings.json'),
  '2707224': require('./booking/booking-2707224.json'),
  '2707229': require('./booking/booking-2707229.json'),
  '2707251': require('./booking/booking-2707251.json'),
};

module.exports.Location = {
  unknown: require('./location/unknown.json'),
  prague: require('./location/prague.json'),
  pragueCsCZ: require('./location/prague-cs-CZ.json'),
  mexico: require('./location/mexico.json'),
  mexCsCZ: require('./location/mex-cs-CZ.json'),
  frankfurt: require('./location/frankfurt.json'),
};

module.exports.Flight = {
  prgMex: require('./flight/prg-mex.json'),
  prgMexCzk: require('./flight/prg-mex-czk.json'),
  prgFraMex: require('./flight/prg,fra-mex.json'),
  prgMexCsCZ: require('./flight/prg-mex-cs-CZ.json'),
  noResults: require('./flight/no-results.json'),
  prgMexFrom7To10Days: require('./flight/prg-mex-from-7-to-10-days.json'),
};

module.exports.Airline = {
  all: require('./airline/airlines.json'),
};

module.exports.Identity = {
  currentUser: require('./identity/currentUser.json'),
};
