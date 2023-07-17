import { faker } from '@faker-js/faker'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import {
  mockSkillUpdaterRepoParams,
  mockSkillUpdaterRepoIdentifier,
} from 'app/interfaces/skill/SkillUpdaterRepo/mock'
import { mockSkillRepo } from 'app/models/SkillRepo/mock'
import { NotFoundError } from 'domain/errors/NotFound'
import { prismaMock } from 'infra/prisma/mock'
import { PrismaSkillUpdaterRepo } from '.'

const makeSut = () => {
  const sut = new PrismaSkillUpdaterRepo()

  const params = mockSkillUpdaterRepoParams()
  const identifier = mockSkillUpdaterRepoIdentifier()
  const skillRepo = mockSkillRepo()

  return {
    sut,
    params,
    identifier,
    skillRepo,
  }
}

describe('PrismaSkillUpdaterRepo', () => {
  it('should call update with right params', async () => {
    const { sut, params, identifier } = makeSut()

    await sut.update(identifier, params)

    expect(prismaMock.skill.update).toBeCalledWith({
      where: {
        id: identifier.id,
      },
      data: params,
    })
  })

  it('should return skill', async () => {
    const { sut, params, identifier, skillRepo } = makeSut()

    prismaMock.skill.update.mockResolvedValue(skillRepo)

    const result = await sut.update(identifier, params)

    expect(result).toEqual(skillRepo)
  })

  it('should NotFoundError if it throw PrismaClientKnownRequestError', async () => {
    const { sut, params, identifier } = makeSut()

    prismaMock.skill.update.mockRejectedValue(
      new PrismaClientKnownRequestError(faker.lorem.words(), {
        clientVersion: faker.database.engine(),
        code: faker.lorem.word(),
      })
    )

    const result = sut.update(identifier, params)

    await expect(result).rejects.toBeInstanceOf(NotFoundError)
  })
})
