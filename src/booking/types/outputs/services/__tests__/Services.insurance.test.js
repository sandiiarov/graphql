// @flow

import Services from '../Services';
import { evaluateResolver } from '../../../../../common/services/TestingTools';

const fields = Services.getFields();

it('returns null when booking status is not confirmed', async () => {
  await expect(
    evaluateResolver(fields.insurance, {
      booking: {
        status: 'pending', // only "confirmed" is a valid status here
      },
    }),
  ).resolves.toBeNull();
});

it('returns null when departure is in less than 48 hours', async () => {
  const date = new Date();
  date.setDate(date.getDate() + 1); // +1 day

  await expect(
    evaluateResolver(fields.insurance, {
      booking: {
        status: 'confirmed', // this status is OK
        departure: {
          when: {
            utc: date,
          },
        },
      },
    }),
  ).resolves.toBeNull();
});

it('returns null when departure is in the past', async () => {
  await expect(
    evaluateResolver(fields.insurance, {
      booking: {
        status: 'confirmed', // this status is OK
        departure: {
          when: {
            utc: new Date('2000-12-24'),
          },
        },
      },
    }),
  ).resolves.toBeNull();
});

it('returns null when all PAX are from USA', async () => {
  await expect(
    evaluateResolver(fields.insurance, {
      booking: {
        status: 'confirmed', // this status is OK
        departure: {
          when: {
            utc: new Date('4000-12-24'), // OK - far in the future
          },
        },
        passengers: [{ nationality: 'us' }, { nationality: 'us' }],
      },
    }),
  ).resolves.toBeNull();
});

it('returns valid PAP', async () => {
  await expect(
    evaluateResolver(fields.insurance, {
      booking: {
        status: 'confirmed', // this status is OK
        departure: {
          when: {
            utc: new Date('4000-12-24'), // OK - far in the future
          },
        },
        passengers: [
          { nationality: 'us' },
          { firstname: 'John', lastname: 'Doe', nationality: 'cz' },
        ],
      },
    }),
  ).resolves.toEqual({
    passengers: [{ firstname: 'John', lastname: 'Doe', nationality: 'cz' }],
  });
});
