import { mockSkillCreaterParams } from 'domain/useCases/skill/SkillCreater/mock'
import { prismaMock } from 'infra/prisma/mock'
import { mockPrismaSkillResult } from 'infra/prisma/models/SkillResult/mock'
import { PrismaSkillCreaterRepo } from '.'

const makeSut = () => {
  const sut = new PrismaSkillCreaterRepo()
  const skillRepo = mockPrismaSkillResult()
  const params = mockSkillCreaterParams()

  return {
    sut,
    skillRepo,
    params,
  }
}

describe('PrismaSkillCreaterRepo', () => {
  it('should call create with right params', async () => {
    const { sut, skillRepo, params } = makeSut()

    prismaMock.skill.create.mockResolvedValue(skillRepo)

    await sut.create(params)

    expect(prismaMock.skill.create).toBeCalledWith({
      data: {
        title: params.title,
      },
    })
  })

  it('should return skill created', async () => {
    const { sut, skillRepo, params } = makeSut()

    prismaMock.skill.create.mockResolvedValue(skillRepo)

    const result = await sut.create(params)

    const expectedResult = sut.adapt(skillRepo)
    expect(result).toEqual(expectedResult)
  })
})
