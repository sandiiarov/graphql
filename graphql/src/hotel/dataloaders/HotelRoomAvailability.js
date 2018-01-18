// @flow

import idx from 'idx';
import Dataloader from 'dataloader';
import { DateTime } from 'luxon';

import { get } from '../services/BookingComRequest';
import { queryWithParameters } from '../../../config/application';

import type { HotelRoomAvailabilityType } from './flow/HotelRoomAvailabilityType';
import type { Block } from './flow/ApiBlockTypes';

type UrlParameters = {|
  checkin: string,
  checkout: string,
  hotel_ids: string,
|};

/**
 * This endpoint is where you find a list of all bookable or available rooms at
 * a property. A room can have multiple blocks, as a block is a combination of
 * the meal, cancellation policy, occupancy and other things.
 *
 * @see https://distribution-xml.booking.com/2.0/json/blockAvailability?checkin=2018-01-09&checkout=2018-01-10&hotel_ids=25215,248539
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
    currency: string,
  ): Promise<HotelRoomAvailabilityType[]> {
    const availableRooms = await this.dataLoader.load({
      checkin: DateTime.fromJSDate(arrivalDate, {
        zone: 'UTC',
      }).toISODate(),
      checkout: DateTime.fromJSDate(departureDate, {
        zone: 'UTC',
      }).toISODate(),
      hotel_ids: hotelIds.join(','),
      currency,
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
            'https://distribution-xml.booking.com/2.0/json/blockAvailability',
            { detail_level: 1, ...parameter },
          ),
        ),
      ),
    );

    return roomBlocks.map(roomBlock =>
      roomBlock.result.map(room => {
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
        amount: Number(
          idx(block, _ => _.min_price.other_currency.price) ||
            block.min_price.price,
        ),
        currency:
          idx(block, _ => _.min_price.other_currency.currency) ||
          block.min_price.currency,
      },
      incrementalPrice: block.incremental_price.map(price => ({
        amount: Number(idx(price, _ => _.other_currency.price) || price.price),
        currency: idx(price, _ => _.other_currency.currency) || price.currency,
      })),
    };
  }
}
