import { faker } from '@faker-js/faker'
import { ClassReader, ClassReaderParams } from '.'

export const mockClassReader = (): jest.Mocked<ClassReader> => ({
  read: jest.fn(),
})

export const mockClassReaderParams = (): ClassReaderParams => ({
  id: faker.number.int(),
})
