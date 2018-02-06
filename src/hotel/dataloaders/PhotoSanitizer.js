// @flow

import path from 'path';
import type { PhotoType as HotelPhotoType } from './flow/PhotoType';

export default function sanitizePhotos(photoData: Object): HotelPhotoType {
  const { url_original, ...photo } = photoData;
  const id = path.basename(url_original, path.extname(url_original));

  return {
    id,
    lowResolution: photo.url_max300,
    highResolution: url_original,
    thumbnail: photo.url_square60,
  };
}
