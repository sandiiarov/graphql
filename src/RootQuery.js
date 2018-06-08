// @flow

import { GraphQLObjectType } from 'graphql';

import AllBookings from './booking/queries/AllBookings';
import NearestBooking from './booking/queries/NearestBooking';
import AllFlights from './flight/queries/AllFlights';
import Currency from './currency/queries/Currency';
import Currencies from './currency/queries/Currencies';
import GeoIP from './geoip/queries/geoIP';
import AllAvailableHotels from './hotel/queries/AllAvailableHotels';
import AvailableHotel from './hotel/queries/AvailableHotel';
import AllLocations from './location/queries/AllLocations';
import Location from './location/queries/Location';
import AllSubLocations from './location/queries/AllSubLocations';
import Booking from './booking/queries/Booking';
import CurrentUser from './identity/queries/CurrentUser';
import Hotel from './hotel/queries/Hotel';
import HotelCities from './hotel/queries/HotelCities';
import AllFAQs from './FAQ/queries/AllFAQs';
import AllFAQCategories from './FAQ/queries/AllFAQCategories';
import FAQCategory from './FAQ/queries/FAQCategory';
import FAQArticle from './FAQ/queries/FAQArticle';
import AllDynamicPackages from './dynamicPackage/queries/AllDynamicPackages';
import { nodeField } from './node/node';
import CustomerSupport from './support/queries/CustomerSupport';

export default new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: {
    allAvailableHotels: AllAvailableHotels,
    allBookings: AllBookings,
    allDynamicPackages: AllDynamicPackages,
    allFAQCategories: AllFAQCategories,
    allFAQs: AllFAQs,
    allFlights: AllFlights,
    allLocations: AllLocations,
    allSubLocations: AllSubLocations,
    availableHotel: AvailableHotel,
    booking: Booking,
    currencies: Currencies,
    currency: Currency,
    currentUser: CurrentUser,
    customerSupport: CustomerSupport,
    FAQArticle: FAQArticle,
    FAQCategory: FAQCategory,
    geoIP: GeoIP,
    hotel: Hotel,
    hotelCities: HotelCities,
    location: Location,
    nearestBooking: NearestBooking,
    node: nodeField,
  },
});
