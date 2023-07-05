import { faker } from '@faker-js/faker'
import { ClassUpdaterRepo, ClassUpdaterRepoParams } from '.'

export const mockClassUpdaterRepo = (): jest.Mocked<ClassUpdaterRepo> => ({
  update: jest.fn(),
})

export const mockClassUpdaterRepoParams = (): ClassUpdaterRepoParams => ({
  title: faker.lorem.words(),
})
