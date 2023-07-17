import { faker } from '@faker-js/faker'
import { SkillUpdater, SkillUpdaterIdentifier, SkillUpdaterParams } from '.'

export const mockSkillUpdater = (): jest.Mocked<SkillUpdater> => ({
  update: jest.fn(),
})

export const mockSkillUpdaterParams = (): SkillUpdaterParams => ({
  title: faker.lorem.words(),
})

export const mockSkillUpdaterIdentifier = (): SkillUpdaterIdentifier => ({
  id: faker.number.int(),
})
