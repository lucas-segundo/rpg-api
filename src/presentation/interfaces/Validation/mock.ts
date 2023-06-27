import { Validation } from '.'

export const mockValidation = (): jest.Mocked<Validation> => ({
  validate: jest.fn(),
})
