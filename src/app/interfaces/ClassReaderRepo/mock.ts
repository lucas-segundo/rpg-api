import { faker } from '@faker-js/faker'
import { ClassReaderRepo, ClassReaderRepoResult } from '.'

export const mockClassReaderRepo = (): jest.Mocked<ClassReaderRepo> => ({
  read: jest.fn(),
})

export const mockClassReaderRepoResult = (): ClassReaderRepoResult => ({
  id: faker.number.int(),
  title: faker.lorem.words(),
})
