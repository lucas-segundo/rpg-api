import { Controller } from '.'

export const mockController = (): jest.Mocked<Controller> => ({
  handle: jest.fn(),
})
