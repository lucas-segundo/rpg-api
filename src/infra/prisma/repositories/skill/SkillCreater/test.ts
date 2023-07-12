import { mockSkillRepo } from 'app/models/SkillRepo/mock'
import { mockSkillCreaterParams } from 'domain/useCases/skill/SkillCreater/mock'
import { prismaMock } from 'infra/prisma/mock'
import { PrismaSkillCreaterRepo } from '.'

describe('PrismaSkillCreaterRepo', () => {
  it('should call create with right params', async () => {
    const sut = new PrismaSkillCreaterRepo()

    prismaMock.skill.create.mockResolvedValue(mockSkillRepo())

    const params = mockSkillCreaterParams()
    await sut.create(params)

    expect(prismaMock.skill.create).toBeCalledWith({
      data: {
        title: params.title,
      },
    })
  })

  it('should return skill created', async () => {
    const sut = new PrismaSkillCreaterRepo()

    const dbSkillCreated = mockSkillRepo()
    prismaMock.skill.create.mockResolvedValue(dbSkillCreated)

    const params = mockSkillCreaterParams()
    const result = await sut.create(params)

    expect(result).toEqual(dbSkillCreated)
  })
})
