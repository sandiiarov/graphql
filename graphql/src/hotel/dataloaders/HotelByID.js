// @flow

import { get } from '../../common/services/HttpRequest';
import Config from '../../../config/application';
import OptimisticDataloader from '../../common/services/OptimisticDataloader';

import type { HotelType } from './flow/HotelType';
import type { PhotoType as HotelPhotoType } from './flow/PhotoType';

/**
 * This data-loader loads all hotels by their ID.
 *
 * @see https://hotels-api.skypicker.com/api/hotelDetails?hotel_ids=25215
 */
export default new OptimisticDataloader(async (hotelIds: number[]): Promise<
  ExtendedHotelType[],
> => sanitizeHotels(await get(Config.restApiEndpoint.hotels.single(hotelIds))));

type ExtendedHotelType = {
  ...HotelType,
  facilities: HotelFacilityType[],
  photos: HotelPhotoType[],
  location: {|
    longitude: string,
    latitude: string,
  |},
};

function sanitizeHotels(hotels): ExtendedHotelType[] {
  return hotels.map(hotel => {
    if (!hotelExists(hotel)) {
      // do not throw, just return it to the OptimisticDataloader
      return new Error('Requested hotel does not exist.');
    }
    return {
      // HotelType:
      id: hotel.hotel_id,
      name: hotel.name,
      rating: Math.round(hotel.class),
      review: {
        // there is no "review_score_word" in the output JSON
        score: hotel.review_score,
        count: hotel.review_nr,
      },
      currencyCode: hotel.currencycode,
      price: null, // it doesn't make sense to provide price in this case
      whitelabelUrl: hotel.url, // it's not whitelabel (?)
      cityName: hotel.city,
      address: {
        street: hotel.address,
        city: hotel.city,
        zip: hotel.zip,
      },
      summary: sanitizeHotelDescription(hotel.descriptions),
      // + ExtendedHotelType:
      facilities: sanitizeHotelFacilities(hotel.facilities),
      photos: sanitizeHotelPhotos(hotel.photos),
      location: {
        longitude: hotel.location.longitude,
        latitude: hotel.location.latitude,
      },
    };
  });
}

export function sanitizeHotelDescription(
  descriptions: Array<{|
    descriptiontype_id: string,
    description: string,
  |}>,
): string | null {
  const summary = descriptions.find(
    // no docs but according to the Booking.com type "6" is called summary
    description => description.descriptiontype_id === '6',
  );
  return summary ? summary.description : null;
}

export type HotelFacilityType = {|
  id: string,
  name: string,
|};

function sanitizeHotelFacilities(facilities): HotelFacilityType[] {
  return facilities.map(facility => ({
    id: facility.hotelfacilitytype_id,
    name: facility.name,
  }));
}

function sanitizeHotelPhotos(photos): HotelPhotoType[] {
  return photos.map(photo => ({
    id: photo.photo_id,
    lowResolution: photo.url_max300,
    highResolution: photo.url_original,
    thumbnail: photo.url_square60,
  }));
}

/**
 * API returns this lovely response for non-existing hotels:
 *
 * [
 *   {
 *     "facilities": [],
 *     "rooms": [],
 *     "descriptions": [],
 *     "photos": [],
 *     "chains": [],
 *     "checkin": {},
 *     "checkout": {},
 *     "location": {}
 *   }
 * ]
 *
 * Let's assume that hotel does not exist if there are no rooms and
 * "checkin" and "checkout" are not defined. This should be enough.
 */
function hotelExists(hotel) {
  return !(
    hotel.rooms.length === 0 &&
    Object.keys(hotel.checkin).length === 0 &&
    Object.keys(hotel.checkout).length === 0
  );
}
