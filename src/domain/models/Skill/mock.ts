import { faker } from '@faker-js/faker'
import { Skill } from '.'

export const mockSkill = (): Skill => ({
  id: faker.number.int(),
  title: faker.lorem.word(),
  deletedAt: faker.date.anytime(),
})
