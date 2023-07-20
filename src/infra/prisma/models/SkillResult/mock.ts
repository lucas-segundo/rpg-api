import { faker } from '@faker-js/faker'
import { PrismaSkillResult } from '.'

export const mockPrismaSkillResult = (): PrismaSkillResult => ({
  id: faker.number.int(),
  title: faker.lorem.words(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  deletedAt: faker.date.anytime(),
})
