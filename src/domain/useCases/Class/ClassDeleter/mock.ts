import { faker } from '@faker-js/faker'
import { ClassDeleter, ClassDeleterParams } from '.'

export const mockClassDeleter = (): jest.Mocked<ClassDeleter> => ({
  delete: jest.fn(),
})

export const mockClassDeleterParams = (): ClassDeleterParams => ({
  id: faker.number.int(),
})
