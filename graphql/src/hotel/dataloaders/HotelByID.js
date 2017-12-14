// @flow

import { get } from '../../common/services/HttpRequest';
import Config from '../../../config/application';
import OptimisticDataloader from '../../common/services/OptimisticDataloader';

import type { HotelType } from './flow/HotelType';
import type { PhotoType as HotelPhotoType } from './flow/PhotoType';

/**
 * This data-loader loads all hotels by their ID.
 */
export default new OptimisticDataloader(async (hotelIds: number[]): Promise<
  ExtendedHotelType[],
> => sanitizeHotels(await get(Config.restApiEndpoint.hotels.single(hotelIds))));

type ExtendedHotelType = {
  ...HotelType,
  facilities: HotelFacilityType[],
  rooms: HotelRoomType[],
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
      currencyCode: hotel.currencycode,
      price: null, // it doesn't make sense to provide price in this case
      whitelabelUrl: hotel.url, // it's not whitelabel (?)
      cityName: hotel.city,
      address: {
        street: hotel.address,
        city: hotel.city,
        zip: hotel.zip,
      },
      // + ExtendedHotelType:
      facilities: sanitizeHotelFacilities(hotel.facilities),
      rooms: sanitizeHotelRooms(hotel.rooms),
      photos: sanitizeHotelPhotos(hotel.photos),
      location: {
        longitude: hotel.location.longitude,
        latitude: hotel.location.latitude,
      },
    };
  });
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

export type HotelRoomType = {|
  id: string,
  type: string,
  maxPersons: string,
  bedding: string,
|};

function sanitizeHotelRooms(rooms): HotelRoomType[] {
  return rooms.map(room => ({
    id: room.room_id,
    type: room.roomtype,
    maxPersons: room.max_persons,
    bedding: room.bedding,
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
