import { Class } from '.'
import { faker } from '@faker-js/faker'
import { mockSkill } from '../Skill/mock'

const mockSkills = () => [mockSkill(), mockSkill()]

export const mockClass = (): Class => ({
  id: faker.number.int(),
  title: faker.lorem.word(),
  skills: mockSkills(),
  deletedAt: faker.date.anytime(),
})
