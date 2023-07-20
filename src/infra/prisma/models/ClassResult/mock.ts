import { faker } from '@faker-js/faker'
import { Skill } from '@prisma/client'
import { PrismaClassResult } from '.'

const mockSkill = (): Skill => ({
  id: faker.number.int(),
  title: faker.lorem.words(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  deletedAt: faker.date.anytime(),
})

const mockClassesSkills = (): PrismaClassResult['classesSkills'][0] => ({
  classId: faker.number.int(),
  skillId: faker.number.int(),
  skill: mockSkill(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  deletedAt: faker.date.anytime(),
})

export const mockPrismaClassResult = (): PrismaClassResult => ({
  id: faker.number.int(),
  title: faker.lorem.words(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  deletedAt: faker.date.anytime(),
  classesSkills: [mockClassesSkills(), mockClassesSkills()],
})
