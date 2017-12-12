// @flow

module.exports.Booking = {
  all: require('../booking/datasets/AllBookings.json'),
  '2707224': require('../booking/datasets/booking-2707224.json'),
  '2707229': require('../booking/datasets/booking-2707229.json'),
  '2707251': require('../booking/datasets/booking-2707251.json'),
};

module.exports.Location = {
  unknown: require('../location/datasets/unknown.json'),
  prague: require('../location/datasets/prague.json'),
  pragueCsCZ: require('../location/datasets/prague-cs-CZ.json'),
  mexico: require('../location/datasets/mexico.json'),
  mexCsCZ: require('../location/datasets/mex-cs-CZ.json'),
  frankfurt: require('../location/datasets/frankfurt.json'),
};

module.exports.Flight = {
  prgMex: require('../flight/datasets/prg-mex.json'),
  prgMexCzk: require('../flight/datasets/prg-mex-czk.json'),
  prgFraMex: require('../flight/datasets/prg,fra-mex.json'),
  prgMexCsCZ: require('../flight/datasets/prg-mex-cs-CZ.json'),
  noResults: require('../flight/datasets/no-results.json'),
};

module.exports.Airline = {
  all: require('../flight/datasets/airlines.json'),
};

module.exports.Identity = {
  currentUser: require('../identity/datasets/currentUser.json'),
};

module.exports.Rates = {
  all: require('../common/datasets/rates.json'),
};

module.exports.Hotels = {
  '19332': require('./hotels/19332.json'),
  all: require('./hotels/all.json'),
};
