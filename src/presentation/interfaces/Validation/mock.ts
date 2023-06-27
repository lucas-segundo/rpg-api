import { faker } from '@faker-js/faker'
import { Validation, ValidationError } from '.'

export const mockValidation = (): jest.Mocked<Validation> => ({
  validate: jest.fn(),
})

export const mockValidationError = (): ValidationError => ({
  message: faker.lorem.words(),
})
