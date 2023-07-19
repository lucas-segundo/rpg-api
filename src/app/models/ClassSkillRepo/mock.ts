import { faker } from '@faker-js/faker'
import { mockClass } from 'domain/models/Class/mock'
import { mockSkill } from 'domain/models/Skill/mock'
import { ClassSkillRepo } from '.'
import { mockBaseData } from '../BaseData/mock'

export const mockClassSkillRepo = (): ClassSkillRepo => ({
  class: mockClass(),
  classId: faker.number.int(),
  skill: mockSkill(),
  skillId: faker.number.int(),
  ...mockBaseData(),
})
