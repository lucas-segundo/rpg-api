import { faker } from '@faker-js/faker'
import { ClassCreaterRepo, ClassCreaterRepoResult } from '.'

export const mockClassCreaterRepo = (): jest.Mocked<ClassCreaterRepo> => ({
  create: jest.fn(),
})

export const mockClassCreaterRepoResult = (): ClassCreaterRepoResult => ({
  id: faker.number.int(),
  title: faker.lorem.words(),
})
