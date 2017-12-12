// @flow

type DateInput = {|
  exact: ?Date,
  from: ?Date,
  to: ?Date,
|};

/**
 * Comparison of dates based on signum function. It returns "zero" for same
 * dates, "+1" if left date is after the right date and "-1" otherwise.
 */
export const compareAsc = (dateLeft: Date, dateRight: Date) =>
  Math.sign(dateLeft.getTime() - dateRight.getTime());

export function validateDates(date: DateInput, returnDate?: DateInput) {
  // it's possible to use only exact dates or dates range but not both
  if (date.exact && (date.from || date.to)) {
    throw new Error('Please specify only exact date OR dates from-to.');
  }
  if (returnDate && returnDate.exact && (returnDate.from || returnDate.to)) {
    throw new Error('Please specify only exact date OR dates from-to.');
  }

  // date range must contain 'from' and 'to' part
  if ((date.from && !date.to) || (!date.from && date.to)) {
    throw new Error(
      'Please specify both "from" and "to" while working with date range OR use exact dates.',
    );
  }
  if (
    returnDate &&
    ((returnDate.from && !returnDate.to) || (!returnDate.from && returnDate.to))
  ) {
    throw new Error(
      'Please specify both "from" and "to" while working with date range OR use exact dates.',
    );
  }

  // date range must be from the past to the future and not vice versa
  if (date.from && date.to && compareAsc(date.from, date.to) > 0) {
    throw new Error("Date 'from' in the range should start before date 'to'.");
  }
  if (
    returnDate &&
    returnDate.from &&
    returnDate.to &&
    compareAsc(returnDate.from, returnDate.to) > 0
  ) {
    throw new Error("Date 'from' in the range should start before date 'to'.");
  }

  // 'returnDate.to' must be in the future (compare to 'date.from' or 'date.exact' if exists)
  if (
    // exact - exact
    date.exact &&
    returnDate &&
    returnDate.exact &&
    compareAsc(date.exact, returnDate.exact) > 0
  ) {
    throw new Error(
      "You cannot travel to the past. Please change 'returnDate' to be in the future.",
    );
  }
  if (
    // exact - range
    date.exact &&
    returnDate &&
    returnDate.to &&
    compareAsc(date.exact, returnDate.to) > 0
  ) {
    throw new Error(
      "You cannot travel to the past. Please change 'returnDate' to be in the future.",
    );
  }
  if (
    // range - range
    date.from &&
    returnDate &&
    returnDate.to &&
    compareAsc(date.from, returnDate.to) > 0
  ) {
    throw new Error(
      "You cannot travel to the past. Please change 'returnDate' to be in the future.",
    );
  }
  if (
    // range - exact
    date.from &&
    returnDate &&
    returnDate.exact &&
    compareAsc(date.from, returnDate.exact) > 0
  ) {
    throw new Error(
      "You cannot travel to the past. Please change 'returnDate' to be in the future.",
    );
  }
}
