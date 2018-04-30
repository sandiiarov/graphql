// @flow

import Dataloader from 'dataloader';
import idx from 'idx';

import { get } from '../services/BookingComRequest';
import { queryWithParameters } from '../../../config/application';
import sanitizeHotelRooms from './HotelRoomsSanitizer';
import { localeToBookingComLanguage } from '../../common/types/enums/LocaleValues';

import type { HotelRoomType } from './flow/HotelRoomType';

type UrlParameters = {|
  hotel_ids: string,
  language: string,
|};

/**
 * Rooms are part of hotel response
 * @see https://distribution-xml.booking.com/2.0/json/hotels?hotel_ids=25215&extras=hotel_info,hotel_photos,hotel_description,hotel_facilities,payment_details,room_info,room_photos,room_description,room_facilities
 */
export default class HotelRoomBlocksDataloader {
  dataLoader: Dataloader<Object, HotelRoomType[]>;
  language: ?string;
  constructor(locale: string) {
    this.language = localeToBookingComLanguage(locale);
    this.dataLoader = new Dataloader(
      (urlParameters: $ReadOnlyArray<UrlParameters>) => {
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
  async load(
    hotelId: string,
    roomId: string,
    language: string,
  ): Promise<HotelRoomType | null> {
    const rooms = await this.loadAll([hotelId], language);
    return rooms.find(room => room.id === roomId) || null;
  }

  /**
   * This method will load all rooms in the hotels.
   */
  async loadAll(
    hotelIds: string[],
    language: string,
  ): Promise<HotelRoomType[]> {
    return this.dataLoader.load({
      hotel_ids: hotelIds.join(','),
      language,
    });
  }

  async batchLoad(
    urlParameters: $ReadOnlyArray<UrlParameters>,
  ): Promise<Array<HotelRoomType[]>> {
    const urls = urlParameters.map(parameter =>
      queryWithParameters(
        'https://distribution-xml.booking.com/2.0/json/hotels',
        {
          extras:
            'hotel_info,hotel_photos,hotel_description,hotel_facilities,payment_details,room_info,room_photos,room_description,room_facilities',
          ...parameter,
          language: this.language || parameter.language,
        },
      ),
    );
    const responses = await Promise.all(urls.map(url => get(url)));
    return urlParameters.map((p, pIndex) => {
      const hotelIds = p.hotel_ids.split(',').map(id => Number(id));
      const hotelRooms = hotelIds.map(hotelId => {
        const results = idx(responses[pIndex], _ => _.result) || [];
        const rooms = results.find(r => r.hotel_id === hotelId);
        if (!rooms) {
          return [];
        }
        return sanitizeHotelRooms(rooms.room_data, hotelId);
      });
      return hotelRooms.reduce((a, b) => a.concat(b));
    });
  }
}
