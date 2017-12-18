// @flow

import Dataloader from 'dataloader';

import { get } from '../../common/services/HttpRequest';
import { queryWithParameters } from '../../../config/application';

import type { HotelRoomType } from './flow/HotelRoomType';

type UrlParameters = {|
  hotel_ids: string,
|};

/**
 * @see https://hotels-api.skypicker.com/api/roomDetails?hotel_ids=25215
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
    const roomDetails = await Promise.all(
      urlParameters.map(parameter =>
        get(
          queryWithParameters(
            'https://hotels-api.skypicker.com/api/roomDetails',
            parameter,
          ),
        ),
      ),
    );
    return roomDetails.map(roomDetail => this.sanitizeHotelRooms(roomDetail));
  }

  sanitizeHotelRooms(rooms: Object): HotelRoomType[] {
    return rooms.map(room => {
      return {
        id: room.room_id,
        type: room.roomtype,
        maxPersons: room.max_persons,
        bedding: room.bedding,
        descriptions: room.descriptions.map(desc => ({
          title: desc.name,
          text: desc.description,
        })),
      };
    });
  }
}
