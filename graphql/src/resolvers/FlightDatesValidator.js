// @flow

import compareAsc from 'date-fns/compare_asc';
import type { DateFromType, DateToType } from '../types/DateTime';

export function validateDates(start: DateFromType, end: DateToType) {
  if (typeof start.exact === 'object') {
    if (typeof end.exact === 'object') {
      if (compareAsc(start.exact, end.exact) > 0) {
        throw new Error('DateFrom should start before dateTo');
      }
    }

    if (typeof end.range === 'object') {
      if (compareAsc(start.exact, end.range.from) > 0) {
        throw new Error('DateFrom should start before dateTo range starts');
      }
    }
  } else if (typeof start.range === 'object') {
    if (typeof end.exact === 'object') {
      if (compareAsc(start.range.to, end.exact) > 0) {
        throw new Error('DateTo should start after dateFrom range');
      }
    }

    if (typeof end.range === 'object') {
      if (compareAsc(start.range.to, end.range.from) > 0) {
        throw new Error('DateTo range should start after dateFrom range start');
      }
    }
  }

  if (typeof end.timeToStay === 'object') {
    const timeToStay = (end: Object).timeToStay;
    if (timeToStay.from <= 0 || timeToStay.from > timeToStay.to) {
      throw new Error('TimeToStay should be range of positive numbers');
    }
  }
}
