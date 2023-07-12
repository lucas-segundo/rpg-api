import { SkillCreaterRepo } from '.'

export const mockSkillCreaterRepo = (): jest.Mocked<SkillCreaterRepo> => ({
  create: jest.fn(),
})
