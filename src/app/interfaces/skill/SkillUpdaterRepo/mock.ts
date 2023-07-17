import { faker } from '@faker-js/faker'
import { SkillUpdaterIdentifier } from 'domain/useCases/skill/SkillUpdater'
import { SkillUpdaterRepo, SkillUpdaterRepoParams } from '.'

export const mockSkillUpdaterRepo = (): jest.Mocked<SkillUpdaterRepo> => ({
  update: jest.fn(),
})

export const mockSkillUpdaterRepoParams = (): SkillUpdaterRepoParams => ({
  title: faker.lorem.words(),
})

export const mockSkillUpdaterRepoIdentifier = (): SkillUpdaterIdentifier => ({
  id: faker.number.int(),
})
