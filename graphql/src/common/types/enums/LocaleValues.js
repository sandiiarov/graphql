// @flow

import LocaleMap from './LocaleMap';

export default createLocaleValues(LocaleMap);

function createLocaleValues(localeMap) {
  const localeValues = {};
  for (let locale in localeMap) {
    localeValues[locale.replace('-', '_')] = { value: locale };
  }
  return localeValues;
}
