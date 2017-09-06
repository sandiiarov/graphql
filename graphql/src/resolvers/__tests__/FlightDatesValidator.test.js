// @flow

import { validateDates } from '../FlightDatesValidator';

let exactInput;
let rangeInput;
let timeTravelRangeInput;

beforeEach(() => {
  exactInput = {
    exact: new Date('2017-12-30'),
    from: null,
    to: null,
  };

  rangeInput = {
    exact: null,
    from: new Date('2017-12-30'),
    to: new Date('2018-12-30'),
  };

  timeTravelRangeInput = {
    // invalid because 'from' is in the future
    exact: null,
    from: new Date('2018-12-30'),
    to: new Date('2017-12-30'),
  };
});

describe('function validateDates', () => {
  it('accepts only exact or date range for departure', () => {
    expect(() => {
      validateDates(
        {
          ...exactInput,
          from: new Date(),
        },
        exactInput,
      );
    }).toThrowError('Please specify only exact date OR dates from-to.');
    expect(() => {
      validateDates(
        {
          ...exactInput,
          to: new Date(),
        },
        exactInput,
      );
    }).toThrowError('Please specify only exact date OR dates from-to.');
  });

  it('accepts only exact or date range for return flight', () => {
    expect(() => {
      validateDates(exactInput, {
        ...exactInput,
        from: new Date(),
      });
    }).toThrowError('Please specify only exact date OR dates from-to.');
    expect(() => {
      validateDates(exactInput, {
        ...exactInput,
        to: new Date(),
      });
    }).toThrowError('Please specify only exact date OR dates from-to.');
  });

  it('accepts date range with "from" and "to" for departure', () => {
    expect(() => {
      // $FlowAllowNextLineInThisTest (invalid arguments)
      validateDates(
        {
          from: new Date(),
        },
        exactInput,
      );
    }).toThrowError(
      'Please specify both "from" and "to" while working with date range OR use exact dates.',
    );
    expect(() => {
      // $FlowAllowNextLineInThisTest (invalid arguments)
      validateDates(
        {
          to: new Date(),
        },
        exactInput,
      );
    }).toThrowError(
      'Please specify both "from" and "to" while working with date range OR use exact dates.',
    );
  });

  it('accepts date range with "from" and "to" for return flight', () => {
    expect(() => {
      // $FlowAllowNextLineInThisTest (invalid arguments)
      validateDates(exactInput, {
        from: new Date(),
      });
    }).toThrowError(
      'Please specify both "from" and "to" while working with date range OR use exact dates.',
    );
    expect(() => {
      // $FlowAllowNextLineInThisTest (invalid arguments)
      validateDates(exactInput, {
        to: new Date(),
      });
    }).toThrowError(
      'Please specify both "from" and "to" while working with date range OR use exact dates.',
    );
  });

  it('accepts exact dates', () => {
    expect(() => {
      validateDates(exactInput, exactInput);
    }).not.toThrow();
  });
  it('accepts date ranges', () => {
    expect(() => {
      validateDates(rangeInput, rangeInput);
    }).not.toThrow();
  });

  it('throws if returnDate is lower than date (exact - exact)', () => {
    expect(() => {
      validateDates(exactInput, {
        ...exactInput,
        exact: new Date('2016-12-30'),
      });
    }).toThrowError(
      "You cannot travel to the past. Please change 'returnDate' to be in the future.",
    );
  });
  it('throws if returnDate is lower than date (exact - range)', () => {
    expect(() => {
      validateDates(exactInput, {
        ...rangeInput,
        from: new Date('2015-12-30'),
        to: new Date('2016-12-30'), // only this is relevant
      });
    }).toThrowError(
      "You cannot travel to the past. Please change 'returnDate' to be in the future.",
    );
  });
  it('throws if returnDate is lower than date (range - range)', () => {
    expect(() => {
      validateDates(rangeInput, {
        ...rangeInput,
        from: new Date('2015-12-30'),
        to: new Date('2016-12-30'), // only this is relevant
      });
    }).toThrowError(
      "You cannot travel to the past. Please change 'returnDate' to be in the future.",
    );
  });
  it('throws if returnDate is lower than date (range - exact)', () => {
    expect(() => {
      validateDates(rangeInput, {
        ...exactInput,
        exact: new Date('2016-12-30'),
      });
    }).toThrowError(
      "You cannot travel to the past. Please change 'returnDate' to be in the future.",
    );
  });

  it('throws if date range is in reverse (departure)', () => {
    expect(() => {
      validateDates(timeTravelRangeInput, rangeInput);
    }).toThrowError("Date 'from' in the range should start before date 'to'.");
  });
  it('throws if date range is in reverse (return flight)', () => {
    expect(() => {
      validateDates(rangeInput, timeTravelRangeInput);
    }).toThrowError("Date 'from' in the range should start before date 'to'.");
  });
});
