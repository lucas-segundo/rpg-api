import { ClassReader } from '.'

export const mockClassReader = (): jest.Mocked<ClassReader> => ({
  read: jest.fn(),
})
