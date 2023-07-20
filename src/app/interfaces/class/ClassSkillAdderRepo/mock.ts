import { ClassSkillAdderRepo } from '.'

export const mockClassSkillAdderRepo =
  (): jest.Mocked<ClassSkillAdderRepo> => ({
    add: jest.fn(),
  })
