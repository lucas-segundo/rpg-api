import { ClassDeleterRepo } from '.'

export const mockClassDeleterRepo = (): jest.Mocked<ClassDeleterRepo> => ({
  delete: jest.fn(),
})
