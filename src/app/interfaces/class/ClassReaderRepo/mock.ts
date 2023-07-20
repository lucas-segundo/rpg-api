import { ClassReaderRepo } from '.'

export const mockClassReaderRepo = (): jest.Mocked<ClassReaderRepo> => ({
  read: jest.fn(),
})
