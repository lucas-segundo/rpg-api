import { faker } from '@faker-js/faker'
import { ClassSkillAdder, ClassSkillAdderParams } from '.'

export const mockClassSkillAdderParams = (): ClassSkillAdderParams => ({
  classId: faker.number.int(),
  skillId: faker.number.int(),
})

export const mockClassSkillAdder = (): jest.Mocked<ClassSkillAdder> => ({
  add: jest.fn(),
})
