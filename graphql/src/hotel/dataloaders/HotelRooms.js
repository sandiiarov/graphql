// @flow

import Dataloader from 'dataloader';
import _ from 'lodash';

import { get } from '../services/BookingComRequest';
import { queryWithParameters } from '../../../config/application';
import sanitizePhoto from './PhotoSanitizer';

import type { HotelRoomType } from './flow/HotelRoomType';

type UrlParameters = {|
  hotel_ids: string,
|};

/**
 * Rooms are part of hotel response
 * @see https://distribution-xml.booking.com/2.0/json/hotels?hotel_ids=25215&extras=hotel_info,hotel_photos,hotel_description,hotel_facilities,payment_details,room_info,room_photos,room_description,room_facilities
 */
export default class HotelRoomBlocksDataloader {
  dataLoader: Dataloader<Object, HotelRoomType[]>;

  constructor() {
    this.dataLoader = new Dataloader(
      (urlParameters: UrlParameters[]) => {
        return this.batchLoad(urlParameters);
      },
      {
        cacheKeyFn: key => JSON.stringify(key),
      },
    );
  }

  /**
   * This method will load one specific room in one hotel.
   */
  async load(hotelId: string, roomId: string): Promise<HotelRoomType | null> {
    const rooms = await this.loadAll([hotelId]);
    return rooms.find(room => room.id === roomId) || null;
  }

  /**
   * This method will load all rooms in the hotels.
   */
  async loadAll(hotelIds: string[]): Promise<HotelRoomType[]> {
    return this.dataLoader.load({
      hotel_ids: hotelIds.join(','),
    });
  }

  async batchLoad(
    urlParameters: Object[],
  ): Promise<Array<HotelRoomType[] | Error>> {
    const urls = urlParameters.map(parameter =>
      queryWithParameters(
        'https://distribution-xml.booking.com/2.0/json/hotels',
        {
          extras:
            'hotel_info,hotel_photos,hotel_description,hotel_facilities,payment_details,room_info,room_photos,room_description,room_facilities',
          ...parameter,
        },
      ),
    );
    const responses = await Promise.all(urls.map(url => get(url)));

    return urlParameters.map((p, pIndex) => {
      const hotelIds = p.hotel_ids.split(',').map(id => Number(id));
      const hotelRooms = hotelIds.map(hotelId => {
        const results = _.get(responses[pIndex], 'result', []);
        const rooms = results.find(r => r.hotel_id === hotelId);
        if (!rooms) return [];
        return this.sanitizeHotelRooms(rooms.room_data, hotelId);
      });
      return hotelRooms.reduce((a, b) => a.concat(b));
    });
  }

  sanitizeHotelRooms(rooms: Object, hotelId: number): HotelRoomType[] {
    return rooms.map(room => {
      return {
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
      };
    });
  }
}

function sanitizePhotos(photos) {
  return photos.map(photo => sanitizePhoto(photo));
}
