import { faker } from '@faker-js/faker'
import { BaseData } from '.'

export const mockBaseData = (): BaseData => ({
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  deletedAt: null,
})
