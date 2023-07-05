import { faker } from '@faker-js/faker'
import { ClassUpdater, ClassUpdaterIdentifier, ClassUpdaterParams } from '.'

export const mockClassUpdater = (): jest.Mocked<ClassUpdater> => ({
  update: jest.fn(),
})

export const mockClassUpdaterParams = (): ClassUpdaterParams => ({
  title: faker.lorem.words(),
})

export const mockClassUpdaterIdentifier = (): ClassUpdaterIdentifier => ({
  id: faker.number.int(),
})
