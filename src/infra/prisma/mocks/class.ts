import { faker } from '@faker-js/faker'

export const mockDbClass = () => ({
  id: faker.number.int(),
  title: faker.lorem.word(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  deletedAt: null,
})
