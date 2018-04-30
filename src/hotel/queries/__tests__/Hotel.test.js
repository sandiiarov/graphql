// @flow

import { toGlobalId } from '../../../common/services/OpaqueIdentifier';

import {
  graphql,
  BookingComApiMock,
} from '../../../common/services/TestingTools';
import SingleHotelDataset from '../../datasets/25215.json';
import createHotelByIdLoader from '../../dataloaders/HotelByID';

const Dataloader = createHotelByIdLoader('en_US');
// keep the URL hardcoded here so we will know if it changed unintentionally
const baseUrl =
  'https://distribution-xml.booking.com/2.0/json/hotels?extras=hotel_info%2Chotel_photos%2Chotel_description%2Chotel_facilities%2Cpayment_details%2Croom_info%2Croom_photos%2Croom_description%2Croom_facilities&hotel_ids=';

beforeEach(() => {
  // reset internal state of the data-loader so the tests will not interfere
  Dataloader.clearAll();
});

describe('single hotels query', () => {
  it('works with single hotel ID', async () => {
    BookingComApiMock.onGet(`${baseUrl}25215&language=en-us`).replyWithData(
      SingleHotelDataset,
    );

    expect(
      await graphql('query($id: ID!) { hotel(id: $id) { id } }', {
        id: toGlobalId('hotel', '25215'),
      }),
    ).toMatchSnapshot();
  });

  it('throws error for unknown ID type (ID mishmash)', async () => {
    expect(
      await graphql('query($id: ID!) { hotel(id: $id) { id } }', {
        id: toGlobalId(
          'identity', // known type but not hotel!
          '248539',
        ),
      }),
    ).toMatchSnapshot();
  });

  it('returns partial error for known type but unknown hotel ID', async () => {
    BookingComApiMock.onGet(`${baseUrl}error&language=en-us`).replyWithData({
      result: [],
    });

    expect(
      await graphql('query($id: ID!) { hotel(id: $id) { id } }', {
        id: toGlobalId('hotel', 'error'),
      }),
    ).toMatchSnapshot();
  });
});
