// @flow

export type HotelRoomType = {|
  id: string,
  type: string,
  maxPersons: string,
  bedding: Array<{|
    amount: string,
    type: string,
  |}>,
  descriptions: Array<{|
    title: string,
    text: string,
  |}>,
|};
