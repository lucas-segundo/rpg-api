import { faker } from '@faker-js/faker'
import { SkillCreater, SkillCreaterParams } from '.'

export const mockSkillCreaterParams = (): SkillCreaterParams => ({
  title: faker.lorem.word(),
})

export const mockSkillCreater = (): jest.Mocked<SkillCreater> => ({
  create: jest.fn(),
})
