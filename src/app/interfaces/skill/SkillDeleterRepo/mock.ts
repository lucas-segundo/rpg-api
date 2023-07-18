import { faker } from '@faker-js/faker'
import { SkillDeleterRepo, SkillDeleterRepoParams } from '.'

export const mockSkillDeleterRepo = (): jest.Mocked<SkillDeleterRepo> => ({
  delete: jest.fn(),
})

export const mockSkillDeleterRepoParams = (): SkillDeleterRepoParams => ({
  id: faker.number.int(),
})
