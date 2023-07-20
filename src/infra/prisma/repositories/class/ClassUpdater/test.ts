import { faker } from '@faker-js/faker'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NotFoundError } from 'domain/errors/NotFound'
import {
  mockClassUpdaterIdentifier,
  mockClassUpdaterParams,
} from 'domain/useCases/class/ClassUpdater/mock'
import { prismaMock } from 'infra/prisma/mock'
import { mockPrismaClassResult } from 'infra/prisma/models/ClassResult/mock'
import { PrismaClassUpdaterRepo } from '.'

const makeSut = () => {
  const sut = new PrismaClassUpdaterRepo()

  const params = mockClassUpdaterParams()
  const identifier = mockClassUpdaterIdentifier()
  const classRepo = mockPrismaClassResult()

  return {
    sut,
    params,
    identifier,
    classRepo,
  }
}

describe('PrismaClassUpdaterRepo', () => {
  it('should call update with right params', async () => {
    const { sut, params, identifier, classRepo } = makeSut()

    prismaMock.class.update.mockResolvedValue(classRepo)

    await sut.update(identifier, params)

    expect(prismaMock.class.update).toBeCalledWith({
      where: {
        id: identifier.id,
      },
      data: params,
      include: { classesSkills: { include: { skill: true } } },
    })
  })

  it('should return class', async () => {
    const { sut, params, identifier, classRepo } = makeSut()

    prismaMock.class.update.mockResolvedValue(classRepo)

    const result = await sut.update(identifier, params)

    const expectedResult = sut.adapt(classRepo)
    expect(result).toEqual(expectedResult)
  })

  it('should NotFoundError if it throw PrismaClientKnownRequestError', async () => {
    const { sut, params, identifier } = makeSut()

    prismaMock.class.update.mockRejectedValue(
      new PrismaClientKnownRequestError(faker.lorem.words(), {
        clientVersion: faker.database.engine(),
        code: faker.lorem.word(),
      })
    )

    const result = sut.update(identifier, params)

    await expect(result).rejects.toBeInstanceOf(NotFoundError)
  })
})
