import { faker } from '@faker-js/faker'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NotFoundError } from 'domain/errors/NotFound'
import { mockClassDeleterParams } from 'domain/useCases/class/ClassDeleter/mock'
import { prismaMock } from 'infra/prisma/mock'
import { mockPrismaClassResult } from 'infra/prisma/models/ClassResult/mock'
import { PrismaClassDeleterRepo } from '.'

const makeSut = () => {
  const sut = new PrismaClassDeleterRepo()

  const params = mockClassDeleterParams()
  const classRepo = mockPrismaClassResult()

  return {
    sut,
    params,
    classRepo,
  }
}

describe('PrismaClassDeleterRepo', () => {
  it('should call delete with right params', async () => {
    const { sut, params, classRepo } = makeSut()

    prismaMock.class.delete.mockResolvedValue(classRepo)

    const date = faker.date.anytime()
    jest.useFakeTimers().setSystemTime(date)

    await sut.delete(params)

    expect(prismaMock.class.delete).toBeCalledWith({
      where: {
        id: params.id,
      },
      include: { classesSkills: { include: { skill: true } } },
    })
  })

  it('should return class', async () => {
    const { sut, params, classRepo } = makeSut()

    prismaMock.class.delete.mockResolvedValue(classRepo)

    const result = await sut.delete(params)

    const expectedResult = sut.adapt(classRepo)
    expect(result).toEqual(expectedResult)
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
