// @flow

import { GraphQLObjectType, GraphQLEnumType } from 'graphql';

type BookedServiceType = {|
  category: string,
  status: string,
|};

// from https://confluence.kiwi.com/display/MOB/Manage+my+booking+specification#Managemybookingspecification-Flightservices
// Note that: at the time of reading this document, the list does not have to be up do date and there may be more of the service categories
const CategoryEnum = new GraphQLEnumType({
  name: 'BookedServiceCategory',
  values: {
    ALLOCATED_SEATING: { value: 'service.allocated_seating' },
    SPECIAL_ASSISTANCE: { value: 'service.special_assistance' },
    SPORTS_EQUIPMENT: { value: 'service.sports_equipment' },
    TRAVELLING_WITH_PETS: { value: 'service.travelling_with_pets' },
    MUSICAL_EQUIPMENT: { value: 'service.musical_equipment' },
    MEALS_ON_BOARD: { value: 'service.meals_on_board' },
    BAGS: { value: 'bags' }, //- ordered by pap through MMB
    EXTRAS_BAGS: { value: 'extras.bags' }, //- added by CS
    EXTRAS_OTHER: { value: 'extras.other' },
    EXTRAS_CHANGE_FLIGHT: { value: 'extras.change_flight' },
    EXTRAS_PASSENGER_DETAILS_CHANGE: {
      value: 'extras.passenger_details_change',
    },
    UPDATE_INSURANCES: { value: 'update_insurances' },
    PRICE_CHANGE: { value: 'price_change' },
    FLIGHTS: { value: 'flights' },
  },
});

const StatusEnum = new GraphQLEnumType({
  name: 'BookedServiceStatus',
  values: {
    CONFIRMED: { value: 'confirmed' },
    CLOSED: { value: 'closed' },
    PENDING: { value: 'pending' },
  },
});

export default new GraphQLObjectType({
  name: 'BookedService',
  fields: {
    category: {
      type: CategoryEnum,
      description: 'Type of booked service',
      resolve: ({ category }: BookedServiceType) => category,
    },
    status: {
      type: StatusEnum,
      description: 'Status of booked service',
      resolve: ({ status }: BookedServiceType) => status,
    },
  },
});
