import { faker } from '@faker-js/faker'
import { ClassDeleterRepo, ClassDeleterRepoParams } from '.'

export const mockClassDeleterRepo = (): jest.Mocked<ClassDeleterRepo> => ({
  delete: jest.fn(),
})

export const mockClassDeleterRepoParams = (): ClassDeleterRepoParams => ({
  id: faker.number.int(),
})
