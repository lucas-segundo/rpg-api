import { SkillReaderRepo } from '.'

export const mockSkillReaderRepo = (): jest.Mocked<SkillReaderRepo> => ({
  read: jest.fn(),
})
