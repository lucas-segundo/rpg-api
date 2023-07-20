import { mockClassDeleterParams } from 'domain/useCases/class/ClassDeleter/mock'
import { prismaMock } from 'infra/prisma/mock'
import { mockPrismaSkillResult } from 'infra/prisma/models/SkillResult/mock'
import { PrismaSkillReaderRepo } from '.'

const makeSut = () => {
  const sut = new PrismaSkillReaderRepo()

  const params = mockClassDeleterParams()
  const skillRepo = mockPrismaSkillResult()

  return {
    sut,
    params,
    skillRepo,
  }
}

describe('PrismaSkillReaderRepo', () => {
  it('should call read with right params', async () => {
    const { sut, params, skillRepo } = makeSut()

    prismaMock.skill.create.mockResolvedValue(skillRepo)

    await sut.read(params)

    expect(prismaMock.skill.findFirst).toBeCalledWith({
      where: {
        id: params.id,
      },
    })
  })

  it('should return skill', async () => {
    const { sut, params, skillRepo } = makeSut()

    prismaMock.skill.findFirst.mockResolvedValue(skillRepo)

    const result = await sut.read(params)

    expect(result).toEqual(skillRepo)
  })
})
