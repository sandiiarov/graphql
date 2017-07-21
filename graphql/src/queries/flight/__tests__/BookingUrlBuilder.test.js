// @flow

import { RestApiMock } from '../../../services/TestingTools';
import config from '../../../../config/application';
import { buildBookingUrl } from '../BookingUrlBuilder';
import createRatesLoader from '../../../dataLoaders/Rates';
import { Rates } from '../../../datasets';

RestApiMock.onGet(config.restApiEndpoint.rates).replyWithData(Rates.all);

describe('BookingUrlBuilder', () => {
  it('should build URL out of passengers, price and token', async () => {
    const passengers = 1;
    const price = { amount: 277, currency: 'EUR' };
    const token =
      'GamFTRHoBQ/v6QB8Irykhs320XfjZPfZzlYyhc7jew2Dq8yTTdVsD0MVZZKJUDu9XzMRuo/IKLwuZelKKXdLks1TGEp/VPhYFJyleAVQUSWlM+0oWhBBoy4fKo/YL3k8yceTu7Eh5k5RYQazReJq0bHURLeybb2WD0wNnTAd1qdZe9gi1HdaZbxz+Qv7dha/k7vxj/33V4bEU0NeOQslO+4BVC/fzI6ZsNb2LVgXv4hUDVTAsnxvSlwmLvfaH8UKCb8RFhW0QbayQdeEfkdNYYAOZYc/MOUa3E/ulEGpHgGN3sPCMkW4d7PWoQmmobJQEZ1sXz3x2JLA8d+ABWQJFvhERt49EDsL4pD2BnNkxEaEOVw/Srk/rb8sQzNh3fy5Fy3fDvUKUCKSjLMfVx/unyMuicmM6RwzF1xH0f8auMiZ2npJi+Msf0DcLSYfSPieqAWzavm9sc1Hg35rzmXUa9RjdIzk40f0TuNNn90mUTE=';
    const bookingUrl = `https://www.kiwi.com/en/booking?passengers=1-0-0&price=277&token=${encodeURIComponent(
      token,
    )}`;
    expect(await buildBookingUrl(passengers, price, token)).toBe(bookingUrl);
  });

  it('should build URL out of 3 passengers, price and token', async () => {
    const passengers = 3;
    const price = { amount: 278, currency: 'EUR' };
    const token =
      'GamFTRHoBQ/v6QB8Irykhs320XfjZPfZzlYyhc7jew2Dq8yTTdVsD0MVZZKJUDu9XzMRuo/IKLwuZelKKXdLks1TGEp/VPhYFJyleAVQUSWlM+0oWhBBoy4fKo/YL3k8yceTu7Eh5k5RYQazReJq0bHURLeybb2WD0wNnTAd1qdZe9gi1HdaZbxz+Qv7dha/k7vxj/33V4bEU0NeOQslO+4BVC/fzI6ZsNb2LVgXv4hUDVTAsnxvSlwmLvfaH8UKCb8RFhW0QbayQdeEfkdNYYAOZYc/MOUa3E/ulEGpHgGN3sPCMkW4d7PWoQmmobJQEZ1sXz3x2JLA8d+ABWQJFvhERt49EDsL4pD2BnNkxEaEOVw/Srk/rb8sQzNh3fy5Fy3fDvUKUCKSjLMfVx/unyMuicmM6RwzF1xH0f8auMiZ2npJi+Msf0DcLSYfSPieqAWzavm9sc1Hg35rzmXUa9RjdIzk40f0TuNNn90mUTE=';
    const bookingUrl = `https://www.kiwi.com/en/booking?passengers=3-0-0&price=278&token=${encodeURIComponent(
      token,
    )}`;
    expect(await buildBookingUrl(passengers, price, token)).toBe(bookingUrl);
  });

  it('should build URL out of passengers, price in CZK and token', async () => {
    const passengers = 1;
    const price = { amount: 7333.56, currency: 'CZK' };
    const token =
      'GamFTRHoBQ/v6QB8Irykhs320XfjZPfZzlYyhc7jew2Dq8yTTdVsD0MVZZKJUDu9XzMRuo/IKLwuZelKKXdLks1TGEp/VPhYFJyleAVQUSWlM+0oWhBBoy4fKo/YL3k8yceTu7Eh5k5RYQazReJq0bHURLeybb2WD0wNnTAd1qdZe9gi1HdaZbxz+Qv7dha/k7vxj/33V4bEU0NeOQslO+4BVC/fzI6ZsNb2LVgXv4hUDVTAsnxvSlwmLvfaH8UKCb8RFhW0QbayQdeEfkdNYYAOZYc/MOUa3E/ulEGpHgGN3sPCMkW4d7PWoQmmobJQEZ1sXz3x2JLA8d+ABWQJFvhERt49EDsL4pD2BnNkxEaEOVw/Srk/rb8sQzNh3fy5Fy3fDvUKUCKSjLMfVx/unyMuicmM6RwzF1xH0f8auMiZ2npJi+Msf0DcLSYfSPieqAWzavm9sc1Hg35rzmXUa9RjdIzk40f0TuNNn90mUTE=';
    const bookingUrl = `https://www.kiwi.com/en/booking?passengers=1-0-0&price=280&token=${encodeURIComponent(
      token,
    )}`;
    const ratesLoader = createRatesLoader();
    expect(
      await buildBookingUrl(passengers, price, token, null, ratesLoader),
    ).toBe(bookingUrl);
  });

  it('should build URL with locale', async () => {
    const passengers = 1;
    const price = { amount: 277, currency: 'EUR' };
    const locale = 'cs-CZ';
    const token =
      'GamFTRHoBQ/v6QB8Irykhs320XfjZPfZzlYyhc7jew2Dq8yTTdVsD0MVZZKJUDu9XzMRuo/IKLwuZelKKXdLks1TGEp/VPhYFJyleAVQUSWlM+0oWhBBoy4fKo/YL3k8yceTu7Eh5k5RYQazReJq0bHURLeybb2WD0wNnTAd1qdZe9gi1HdaZbxz+Qv7dha/k7vxj/33V4bEU0NeOQslO+4BVC/fzI6ZsNb2LVgXv4hUDVTAsnxvSlwmLvfaH8UKCb8RFhW0QbayQdeEfkdNYYAOZYc/MOUa3E/ulEGpHgGN3sPCMkW4d7PWoQmmobJQEZ1sXz3x2JLA8d+ABWQJFvhERt49EDsL4pD2BnNkxEaEOVw/Srk/rb8sQzNh3fy5Fy3fDvUKUCKSjLMfVx/unyMuicmM6RwzF1xH0f8auMiZ2npJi+Msf0DcLSYfSPieqAWzavm9sc1Hg35rzmXUa9RjdIzk40f0TuNNn90mUTE=';
    const bookingUrl = `https://www.kiwi.com/cz/booking?passengers=1-0-0&price=277&token=${encodeURIComponent(
      token,
    )}`;
    expect(await buildBookingUrl(passengers, price, token, locale)).toBe(
      bookingUrl,
    );
  });
});
