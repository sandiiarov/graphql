import Place from '../Place';

const fields = Place.getFields();

it('ID field should be non-null ID type', () => {
  expect(fields.id.type.toString()).toBe('ID!');
});

it('Location field should be non-null Location type', () => {
  expect(fields.location.type.toString()).toBe('Location!');
});

it('Name field should be non-null String type', () => {
  expect(fields.name.type.toString()).toBe('String!');
});

it('NumberOfAirports field should be non-null Int type', () => {
  expect(fields.numberOfAirports.type.toString()).toBe('Int!');
});

it('Population field should be nullable Int type', () => {
  expect(fields.population.type.toString()).toBe('Int');
});
