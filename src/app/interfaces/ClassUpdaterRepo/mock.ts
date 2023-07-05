import { faker } from '@faker-js/faker'
import { ClassUpdaterIdentifier } from 'domain/useCases/ClassUpdater'
import { ClassUpdaterRepo, ClassUpdaterRepoParams } from '.'

export const mockClassUpdaterRepo = (): jest.Mocked<ClassUpdaterRepo> => ({
  update: jest.fn(),
})

export const mockClassUpdaterRepoParams = (): ClassUpdaterRepoParams => ({
  title: faker.lorem.words(),
})

export const mockClassUpdaterRepoIdentifier = (): ClassUpdaterIdentifier => ({
  id: faker.number.int(),
})
