// @flow
import { fetchJson } from '../../common/services/JsonFetcher';
import type { GeoIP } from '../types/outputs/GeoIPType';

const getGeoIP = (ip: string): Promise<GeoIP> =>
  fetchJson(`https://geoip-api-prod.skypicker.com/geoip-api?ip=${ip}`);

export default getGeoIP;
