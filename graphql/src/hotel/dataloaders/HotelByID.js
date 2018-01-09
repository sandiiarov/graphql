// @flow

import { get } from '../services/BookingComRequest';
import { queryWithParameters } from '../../../config/application';
import OptimisticDataloader from '../../common/services/OptimisticDataloader';
import sanitizePhoto from './PhotoSanitizer';

import type { HotelExtendedType } from './flow/HotelExtendedType';
import type { HotelFacilityType } from './flow/HotelFacilityType';
import type { HotelRoomType } from './flow/HotelRoomType';

/**
 * This data-loader loads all hotels by their ID.
 *
 * @see https://distribution-xml.booking.com/2.0/json/hotels?hotel_ids=25215&extras=hotel_info,hotel_photos,hotel_description,hotel_facilities,payment_details,room_info,room_photos,room_description,room_facilities
 */
export default new OptimisticDataloader(async (hotelIds: number[]): Promise<
  Array<HotelExtendedType | Error>,
> => {
  const response = await get(createUrl(hotelIds));
  const hotels = hotelIds.map(id => {
    const hotelData = response.result.find(h => h.hotel_id == id);
    if (!hotelData) return new Error('Requested hotel does not exist.');
    return sanitizeHotel(hotelData);
  });
  return hotels;
});

function createUrl(hotelIds: number[]) {
  const params = {
    extras:
      'hotel_info,hotel_photos,hotel_description,hotel_facilities,payment_details,room_info,room_photos,room_description,room_facilities',
    hotel_ids: hotelIds.join(','),
  };
  return queryWithParameters(
    'https://distribution-xml.booking.com/2.0/json/hotels',
    params,
  );
}

function sanitizeHotel(hotelData): HotelExtendedType {
  const { hotel_data: hotel, hotel_id, room_data: rooms } = hotelData;
  return {
    id: hotel_id,
    name: hotel.name,
    rating: Math.round(hotel.class),
    review: {
      // there is no "review_score_word" in the output JSON
      score: hotel.review_score,
      count: hotel.number_of_reviews,
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
    summary: hotel.hotel_description,
    facilities: sanitizeHotelFacilities(hotel.hotel_facilities),
    photos: sanitizePhotos(hotel.hotel_photos),
    location: {
      longitude: hotel.location.longitude,
      latitude: hotel.location.latitude,
    },
    rooms: sanitizeHotelRooms(rooms, hotel_id),
  };
}

function sanitizeHotelFacilities(facilities): HotelFacilityType[] {
  if (!Array.isArray(facilities)) return [];
  return facilities.map(facility => ({
    id: facility.hotelfacilitytype_id,
    name: facility.name,
  }));
}

function sanitizePhotos(photos) {
  if (!Array.isArray(photos)) return [];
  return photos.map(photo => sanitizePhoto(photo));
}

function sanitizeHotelRooms(rooms: Object, hotelId: number): HotelRoomType[] {
  return rooms.map(room => ({
    id: room.room_id,
    hotelId,
    type: room.room_info.room_type,
    maxPersons: room.room_info.max_persons,
    bedding: null, // not provided by API v2
    descriptions: [
      {
        title: room.room_name,
        text: room.room_description,
      },
    ],
    photos: sanitizePhotos(room.room_photos),
  }));
}
