import { SkillDeleterRepo } from '.'

export const mockSkillDeleterRepo = (): jest.Mocked<SkillDeleterRepo> => ({
  delete: jest.fn(),
})
