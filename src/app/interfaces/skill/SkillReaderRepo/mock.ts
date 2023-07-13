import { faker } from '@faker-js/faker'
import { SkillReaderRepo, SkillReaderRepoParams } from '.'

export const mockSkillReaderRepo = (): jest.Mocked<SkillReaderRepo> => ({
  read: jest.fn(),
})

export const mockSkillReaderRepoParams = (): SkillReaderRepoParams => ({
  id: faker.number.int(),
})
