import { faker } from '@faker-js/faker'
import { SkillReader, SkillReaderParams } from '.'

export const mockSkillReader = (): jest.Mocked<SkillReader> => ({
  read: jest.fn(),
})

export const mockSkillReaderParams = (): SkillReaderParams => ({
  id: faker.number.int(),
})
