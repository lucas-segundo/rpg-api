import { Class } from '.'
import { faker } from '@faker-js/faker'

export const mockClass = (): Class => ({
  id: faker.string.uuid(),
  title: faker.lorem.word(),
})
