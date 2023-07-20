import { faker } from '@faker-js/faker'
import { SkillUpdaterIdentifier } from 'domain/useCases/skill/SkillUpdater'
import { SkillUpdaterRepo } from '.'

export const mockSkillUpdaterRepo = (): jest.Mocked<SkillUpdaterRepo> => ({
  update: jest.fn(),
})

export const mockSkillUpdaterRepoIdentifier = (): SkillUpdaterIdentifier => ({
  id: faker.number.int(),
})
