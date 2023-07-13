import { mockSkillReaderRepoParams } from 'app/interfaces/skill/SkillReaderRepo/mock'
import { mockSkillRepo } from 'app/models/SkillRepo/mock'
import { prismaMock } from 'infra/prisma/mock'
import { PrismaSkillReaderRepo } from '.'

describe('PrismaSkillReaderRepo', () => {
  it('should call read with right params', async () => {
    const sut = new PrismaSkillReaderRepo()

    prismaMock.skill.create.mockResolvedValue(mockSkillRepo())

    const params = mockSkillReaderRepoParams()
    await sut.read(params)

    expect(prismaMock.skill.findFirst).toBeCalledWith({
      where: {
        id: params.id,
      },
    })
  })

  it('should return skill', async () => {
    const sut = new PrismaSkillReaderRepo()

    const skillRepo = mockSkillRepo()
    prismaMock.skill.findFirst.mockResolvedValue(skillRepo)

    const params = mockSkillReaderRepoParams()
    const result = await sut.read(params)

    expect(result).toEqual(skillRepo)
  })
})
