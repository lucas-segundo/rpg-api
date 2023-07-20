import { faker } from '@faker-js/faker'
import { ClassUpdaterIdentifier } from 'domain/useCases/class/ClassUpdater'
import { ClassUpdaterRepo } from '.'

export const mockClassUpdaterRepo = (): jest.Mocked<ClassUpdaterRepo> => ({
  update: jest.fn(),
})

export const mockClassUpdaterRepoIdentifier = (): ClassUpdaterIdentifier => ({
  id: faker.number.int(),
})
