import { faker } from '@faker-js/faker'
import { SkillDeleter, SkillDeleterParams } from '.'

export const mockSkillDeleter = (): jest.Mocked<SkillDeleter> => ({
  delete: jest.fn(),
})

export const mockSkillDeleterParams = (): SkillDeleterParams => ({
  id: faker.number.int(),
})
