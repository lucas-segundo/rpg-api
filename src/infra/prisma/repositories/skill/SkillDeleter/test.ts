import { faker } from '@faker-js/faker'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NotFoundError } from 'domain/errors/NotFound'
import { mockSkillDeleterParams } from 'domain/useCases/skill/SkillDeleter/mock'
import { prismaMock } from 'infra/prisma/mock'
import { mockPrismaSkillResult } from 'infra/prisma/models/SkillResult/mock'
import { PrismaSkillDeleterRepo } from '.'

const makeSut = () => {
  const sut = new PrismaSkillDeleterRepo()

  const params = mockSkillDeleterParams()
  const skillRepo = mockPrismaSkillResult()

  return {
    sut,
    params,
    skillRepo,
  }
}

describe('PrismaSkillDeleterRepo', () => {
  it('should call delete with right params', async () => {
    const { sut, params, skillRepo } = makeSut()

    prismaMock.skill.delete.mockResolvedValue(skillRepo)

    const date = faker.date.anytime()
    jest.useFakeTimers().setSystemTime(date)

    await sut.delete(params)

    expect(prismaMock.skill.delete).toBeCalledWith({
      where: {
        id: params.id,
      },
    })
  })

  it('should return skill', async () => {
    const { sut, params, skillRepo } = makeSut()

    prismaMock.skill.delete.mockResolvedValue(skillRepo)

    const result = await sut.delete(params)

    const expectedResult = sut.adapt(skillRepo)
    expect(result).toEqual(expectedResult)
  })

  it('should NotFoundError if it throw PrismaClientKnownRequestError', async () => {
    const { sut, params } = makeSut()

    prismaMock.skill.delete.mockRejectedValue(
      new PrismaClientKnownRequestError(faker.lorem.words(), {
        clientVersion: faker.database.engine(),
        code: faker.lorem.word(),
      })
    )

    const result = sut.delete(params)

    await expect(result).rejects.toBeInstanceOf(NotFoundError)
  })
})
