// @flow

import Dataloader from 'dataloader';
import { DateTime } from 'luxon';

import { get } from '../../common/services/HttpRequest';
import { queryWithParameters } from '../../../config/application';

import type { HotelRoomAvailabilityType } from './flow/HotelRoomAvailabilityType';
import type { Block } from './flow/ApiBlockTypes';

type UrlParameters = {|
  arrival_date: string,
  departure_date: string,
  hotel_ids: string,
|};

/**
 * This endpoint is where you find a list of all bookable or available rooms at
 * a property. A room can have multiple blocks, as a block is a combination of
 * the meal, cancellation policy, occupancy and other things.
 *
 * @see https://hotels-api.skypicker.com/api/blocks?arrival_date=2018-01-09&departure_date=2018-01-10&hotel_ids=25215,248539
 */
export default class HotelRoomAvailabilityLoader {
  dataLoader: Dataloader<Object, HotelRoomAvailabilityType[]>;

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

  async load(
    hotelIds: string[],
    arrivalDate: Date,
    departureDate: Date,
  ): Promise<HotelRoomAvailabilityType[]> {
    const availableRooms = await this.dataLoader.load({
      arrival_date: DateTime.fromJSDate(arrivalDate, {
        zone: 'UTC',
      }).toISODate(),
      departure_date: DateTime.fromJSDate(departureDate, {
        zone: 'UTC',
      }).toISODate(),
      hotel_ids: hotelIds.join(','),
    });

    // flatten all room blocks
    return availableRooms.reduce((acc, curVal) => acc.concat(curVal), []);
  }

  async batchLoad(
    urlParameters: UrlParameters[],
  ): Promise<Array<HotelRoomAvailabilityType[] | Error>> {
    const roomBlocks = await Promise.all(
      urlParameters.map(parameter =>
        get(
          queryWithParameters(
            'https://hotels-api.skypicker.com/api/blocks',
            parameter,
          ),
        ),
      ),
    );

    return roomBlocks.map(roomBlock =>
      roomBlock.map(room => {
        return room.block.map(block =>
          this.sanitizeHotelRoomAvailability(block, room.hotel_id),
        );
      }),
    );
  }

  sanitizeHotelRoomAvailability(
    block: Block,
    hotelId: string,
  ): HotelRoomAvailabilityType {
    return {
      id: block.block_id,
      hotelId: hotelId,
      roomId: block.room_id,
      minPrice: {
        amount: Number(block.min_price.price),
        currency: block.min_price.currency,
      },
      incrementalPrice: block.incremental_price.map(price => ({
        amount: Number(price.price),
        currency: price.currency,
      })),
    };
  }
}
