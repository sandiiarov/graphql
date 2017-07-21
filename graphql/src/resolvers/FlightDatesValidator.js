// @flow

import compareAsc from 'date-fns/compare_asc';

export function validateDates(start: Date, end: Date) {
  if (compareAsc(start, end) > 0) {
    throw new Error('DateFrom should start before dateTo');
  }
}
