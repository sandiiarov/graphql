// @flow

import DataLoader from 'dataloader';

import IdentityDataloader from '../../identity/dataloaders/Identity';
import createBookingLoader from '../../booking/dataloaders/Booking';
import createCurrencyLoader from '../../currency/dataloaders/Currency';
import createAirlineLoader from '../../flight/dataloaders/Airline';
import createRatesLoader from '../dataloaders/Rates';
import createFAQLoader from '../../FAQ/dataloaders/searchFAQ';
import createFAQCategoryLoader from '../../FAQ/dataloaders/getFAQCategory';
import createFAQArticleLoader from '../../FAQ/dataloaders/getFAQArticle';
import BookingsLoader from '../../booking/dataloaders/Bookings';
import LocationSuggestionsLoader from '../../location/dataloaders/LocationSuggestions';
import LocationLoader from '../../location/dataloaders/Location';
import FlightLoader from '../../flight/dataloaders/Flight';
import OptionsStorage from './context/OptionsStorage';
import HotelsAvailability from '../../hotel/dataloaders/HotelsAvailability';
import { type SearchParameters as HotelKey } from '../../hotel/dataloaders/flow/SearchParameters';
import createHotelByIdLoader from '../../hotel/dataloaders/HotelByID';
import HotelCities from '../../hotel/dataloaders/HotelCities';
import CitiesByID from '../../hotel/dataloaders/CitiesByID';
import HotelRoomsLoader from '../../hotel/dataloaders/HotelRooms';
import HotelRoomAvailabilityLoader from '../../hotel/dataloaders/HotelRoomAvailability';
import HotelRoomBeddingLoader from '../../hotel/dataloaders/RoomBedding';
import PriceStatsLoader from '../../hotel/dataloaders/PriceStats';

import type { Booking } from '../../booking/Booking';
import type { Airline } from '../../flight/Flight';
import type { CurrencyDetail } from '../../currency/CurrencyDetail';
import type { HotelType } from '../../hotel/dataloaders/flow/HotelType';
import type { City } from '../../hotel/dataloaders/flow/City';
import type { Args as FAQArgs } from '../../FAQ/dataloaders/searchFAQ';
import type {
  Args as FAQCategoryArgs,
  FAQArticleItem,
} from '../../FAQ/dataloaders/getFAQCategory';
import type {
  Args as FAQCArticleArgs,
  FAQArticleDetail,
} from '../../FAQ/dataloaders/getFAQArticle';
import type { FAQCategoryType } from '../../FAQ/types/outputs/FAQCategory';
import ISOLocalesToObsolete from '../types/enums/ISOLocalesToObsolete';
import ISOLocalesToLanguage from '../types/enums/ISOLocalesToLanguage';

/**
 * FIXME:
 * This is stupid - it's already defined by data-loader itself but currently
 * it's needed to type resolvers. How to do it better?
 */
export type GraphqlContextType = {|
  // DataLoader<K, V>
  locale: $Keys<typeof ISOLocalesToObsolete>,
  apiToken: ?string,
  dataLoader: {|
    airline: DataLoader<string, ?Airline>,
    booking: DataLoader<number | string, Booking>,
    bookings: BookingsLoader,
    currency: DataLoader<string, CurrencyDetail>,
    flight: FlightLoader,
    identity: IdentityDataloader,
    location: LocationLoader,
    locationSuggestions: LocationSuggestionsLoader,
    rates: DataLoader<string, ?number>,
    city: DataLoader<string, City>,
    hotel: {
      availabilityByLocation: DataLoader<HotelKey, HotelType[]>,
      availabilityByID: DataLoader<HotelKey, HotelType[]>,
      byID: DataLoader<$FlowFixMe, $FlowFixMe>,
      cities: HotelCities,
      room: HotelRoomsLoader,
      roomAvailability: HotelRoomAvailabilityLoader,
      roomBedding: typeof HotelRoomBeddingLoader,
      priceStats: DataLoader<
        { searchParams: HotelKey, boundary: 'MAX' | 'MIN' },
        number,
      >,
    },
    FAQ: DataLoader<FAQArgs, FAQArticleItem[]>,
    FAQCategories: DataLoader<FAQCategoryArgs, FAQCategoryType[]>,
    FAQArticle: DataLoader<FAQCArticleArgs, FAQArticleDetail>,
  |},
  options: OptionsStorage,
  _traceCollector?: Object,
|};

export function createContext(
  token: ?string,
  acceptLanguage: ?string,
): GraphqlContextType {
  const locale: $Keys<typeof ISOLocalesToObsolete> = // $FlowIssue: https://github.com/facebook/flow/issues/6230
    typeof acceptLanguage === 'string' &&
    ISOLocalesToObsolete.hasOwnProperty(acceptLanguage)
      ? acceptLanguage
      : 'en_US';
  const language: $Values<typeof ISOLocalesToLanguage> = ISOLocalesToLanguage[
    locale
  ]
    ? ISOLocalesToLanguage[locale]
    : 'en';
  const bookings = new BookingsLoader(token);
  const locationSuggestions = new LocationSuggestionsLoader();
  const location = new LocationLoader(locationSuggestions);
  const hotelCities = new HotelCities();

  return {
    locale,
    apiToken: token,
    dataLoader: {
      airline: createAirlineLoader(),
      booking: createBookingLoader(token, bookings),
      bookings: bookings,
      currency: createCurrencyLoader(),
      flight: new FlightLoader(location),
      identity: new IdentityDataloader(token),
      location: location,
      locationSuggestions: locationSuggestions,
      rates: createRatesLoader(),
      city: CitiesByID,
      hotel: {
        availabilityByLocation: HotelsAvailability,
        availabilityByID: HotelsAvailability,
        byID: createHotelByIdLoader(locale),
        cities: hotelCities,
        room: new HotelRoomsLoader(locale),
        roomAvailability: new HotelRoomAvailabilityLoader(),
        roomBedding: HotelRoomBeddingLoader,
        priceStats: PriceStatsLoader,
      },
      FAQ: createFAQLoader(language),
      FAQCategories: createFAQCategoryLoader(language),
      FAQArticle: createFAQArticleLoader(language),
    },
    options: new OptionsStorage(),
  };
}
