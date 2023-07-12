import { faker } from '@faker-js/faker'
import { ClassReaderRepo, ClassReaderRepoParams } from '.'

export const mockClassReaderRepo = (): jest.Mocked<ClassReaderRepo> => ({
  read: jest.fn(),
})

export const mockClassReaderRepoParams = (): ClassReaderRepoParams => ({
  id: faker.number.int(),
})
