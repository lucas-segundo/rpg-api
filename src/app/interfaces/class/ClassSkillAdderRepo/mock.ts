import { faker } from '@faker-js/faker'
import { ClassSkillAdderParams } from 'domain/useCases/class/ClassSkillAdder'
import { ClassSkillAdderRepo } from '.'

export const mockClassSkillAdderRepo =
  (): jest.Mocked<ClassSkillAdderRepo> => ({
    add: jest.fn(),
  })

export const mockClassSkillAdderRepoParams = (): ClassSkillAdderParams => ({
  classId: faker.number.int(),
  skillId: faker.number.int(),
})
