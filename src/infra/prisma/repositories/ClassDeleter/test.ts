import { faker } from '@faker-js/faker'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { mockClassDeleterRepoParams } from 'app/interfaces/ClassDeleterRepo/mock'
import { mockClassRepo } from 'app/models/ClassRepo/mock'
import { NotFoundError } from 'domain/errors/NotFound'
import { prismaMock } from 'infra/prisma/mock'
import { PrismaClassDeleterRepo } from '.'

const makeSut = () => {
  const sut = new PrismaClassDeleterRepo()

  const params = mockClassDeleterRepoParams()
  const classRepo = mockClassRepo()

  return {
    sut,
    params,
    classRepo,
  }
}

describe('PrismaClassDeleterRepo', () => {
  it('should call delete with right params', async () => {
    const { sut, params } = makeSut()

    const date = faker.date.anytime()
    jest.useFakeTimers().setSystemTime(date)

    await sut.delete(params)

    expect(prismaMock.class.delete).toBeCalledWith({
      where: {
        id: params.id,
      },
    })
  })

  it('should return class', async () => {
    const { sut, params, classRepo } = makeSut()

    prismaMock.class.delete.mockResolvedValue(classRepo)

    const result = await sut.delete(params)

    expect(result).toEqual(classRepo)
  })

  it('should NotFoundError if it throw PrismaClientKnownRequestError', async () => {
    const { sut, params } = makeSut()

    prismaMock.class.delete.mockRejectedValue(
      new PrismaClientKnownRequestError(faker.lorem.words(), {
        clientVersion: faker.database.engine(),
        code: faker.lorem.word(),
      })
    )

    const result = sut.delete(params)

    await expect(result).rejects.toBeInstanceOf(NotFoundError)
  })
})
