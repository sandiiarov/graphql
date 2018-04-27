// @flow

import LocaleMap from './LocaleMap';

export default createLocaleValues(LocaleMap);

function createLocaleValues(localeMap) {
  const localeValues = {};
  for (const locale in localeMap) {
    localeValues[locale.replace('-', '_')] = {
      value: locale,
      deprecationReason: 'Use "Accept-Language" HTTP header to specify locale.',
    };
  }
  return localeValues;
}

export const ISOLocalesToObsolete = Object.keys(
  LocaleMap,
).reduce((memo, locale) => {
  memo[locale.replace('-', '_')] = locale;

  return memo;
}, {});
