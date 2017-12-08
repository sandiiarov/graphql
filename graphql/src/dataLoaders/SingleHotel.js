// @flow

import { get } from '../services/HttpRequest';
import Config from '../../config/application';
import OptimisticDataloader from '../services/OptimisticDataloader';

import type { HotelType } from './AllHotels';

export default new OptimisticDataloader(async (hotelIds: number[]): Promise<
  HotelType[],
> => sanitizeHotels(await get(Config.restApiEndpoint.hotels.single(hotelIds))));

function sanitizeHotels(hotels): HotelType[] {
  return hotels.map(hotel => {
    if (!hotelExists(hotel)) {
      // do not throw, just return it to the OptimisticDataloader
      return new Error('Requested hotel does not exist.');
    }
    return {
      id: hotel.hotel_id,
      name: hotel.name,
      rating: Math.round(hotel.class),
      currencyCode: hotel.currencycode,
      price: null, // it doesn't make sense to provide price in this case
      photoUrl: hotel.photos[0].url_original,
      whitelabelUrl: hotel.url, // it's not whitelabel (?)
      cityName: hotel.city,
      facilities: sanitizeHotelFacilities(hotel.facilities),
      rooms: sanitizeHotelRooms(hotel.rooms),
      photos: sanitizeHotelPhotos(hotel.photos),
    };
  });
}

export type HotelFacilityType = {|
  id: string,
  name: string,
  hotelId: string,
|};

function sanitizeHotelFacilities(facilities): HotelFacilityType[] {
  return facilities.map(facility => ({
    id: facility.hotelfacilitytype_id,
    name: facility.name,
    hotelId: facility.hotel_id,
  }));
}

export type HotelRoomType = {|
  id: string,
  type: string,
  maxPersons: string,
  bedding: string,
  hotelId: string,
|};

function sanitizeHotelRooms(rooms): HotelRoomType[] {
  return rooms.map(room => ({
    id: room.room_id,
    type: room.roomtype,
    maxPersons: room.max_persons,
    bedding: room.bedding,
    hotelId: room.hotel_id,
  }));
}

export type HotelPhotoType = {|
  id: string,
  lowResolution: string,
  highResolution: string,
  hotelId: string,
|};

function sanitizeHotelPhotos(photos): HotelPhotoType[] {
  return photos.map(photo => ({
    id: photo.photo_id,
    lowResolution: photo.url_max300,
    highResolution: photo.url_original,
    hotelId: photo.hotel_id,
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
