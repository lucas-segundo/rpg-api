import { Class } from '.'
import { faker } from '@faker-js/faker'

export const mockClass = (): Class => ({
  id: faker.number.int(),
  title: faker.lorem.word(),
})
