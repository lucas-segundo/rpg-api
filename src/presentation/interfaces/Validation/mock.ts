import { faker } from '@faker-js/faker'
import { Validation, ValidationError } from '.'

export const mockValidation = (): jest.Mocked<Validation> => ({
  validate: jest.fn(),
})

export const mockValidationErrors = (): ValidationError[] => [
  {
    field: faker.database.column(),
    errors: [faker.lorem.words()],
  },
  {
    field: faker.database.column(),
    errors: [faker.lorem.words()],
  },
  {
    field: faker.database.column(),
    errors: [faker.lorem.words()],
  },
]
