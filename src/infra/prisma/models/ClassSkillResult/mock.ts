import { faker } from '@faker-js/faker'
import { PrismaClassSkillResult } from '.'
import { mockPrismaClassResult } from '../ClassResult/mock'
import { mockPrismaSkillResult } from '../SkillResult/mock'

export const mockPrismaClassesSkillsResult = (): PrismaClassSkillResult => ({
  classId: faker.number.int(),
  skillId: faker.number.int(),
  skill: mockPrismaSkillResult(),
  class: mockPrismaClassResult(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  deletedAt: faker.date.anytime(),
})
