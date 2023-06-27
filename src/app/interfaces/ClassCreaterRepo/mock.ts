import { faker } from '@faker-js/faker'
import { ClassCreaterRepo, ClassCreaterRepoResult } from '.'

export const mockClassCreaterRepo = (): jest.Mocked<ClassCreaterRepo> => ({
  create: jest.fn(),
})

export const mockClassCreaterRepoResult = (): ClassCreaterRepoResult => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(),
})
