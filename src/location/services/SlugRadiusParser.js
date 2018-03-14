// @flow

type SlugRadius = {|
  slug: string,
  radius: number,
|};
type GpsRadius = {|
  gps: { lat: number, lng: number },
  radius: number,
|};

export default function parse(slugRadius: string): SlugRadius | GpsRadius {
  const radius = getRadius(slugRadius);
  const slug = stripRadius(slugRadius, radius);

  // slug is not in lat-lng format
  if (slug.match(/^[0-9.-]+$/g) === null) {
    return { slug, radius };
  }

  const gps = getGps(slug);
  return { gps, radius };
}

function getRadius(slugRadius: string): number {
  const regex = RegExp('([0-9]+)km$', 'g');
  const parts: string[] = regex.exec(slugRadius);
  if (!Array.isArray(parts)) {
    throw new Error(`Error parsing radius. Input: ${slugRadius}`);
  }

  const radius = Number(parts[1]);
  if (Number.isNaN(radius) || !Number.isFinite(radius) || radius <= 0) {
    throw new Error(`Error parsing radius. Input: ${slugRadius}`);
  }
  return radius;
}

function getGps(slug: string): {| lat: number, lng: number |} {
  const { value: lat, slug: stripped } = stripCoordinate(slug);
  const { value: lng } = stripCoordinate(stripped);
  return { lat, lng };
}

function stripCoordinate(slug: string): {| value: number, slug: string |} {
  const parts = slug.match(/-?\d+(\.\d+)?/);
  if (!parts) {
    throw new Error(`Error parsing location. Input: ${slug}`);
  }
  const value = Number(parts[0]);

  const stripped = slug.substr(`${parts[0]}-`.length);
  return { value, slug: stripped };
}

function stripRadius(slugRadius: string, radius: number): string {
  const r = `-${radius}km`;
  const slug = slugRadius.substr(0, slugRadius.length - r.length);
  if (!slug.length)
    throw new Error(`Error parsing radius. Input: ${slugRadius}`);
  return slug;
}
