import { Skill } from 'domain/models/Skill'
import { mockPrismaSkillResult } from 'infra/prisma/models/SkillResult/mock'
import { PrismaSkillAdapter } from '.'

const makeSut = () => {
  class PrismaSkillAdapterMocked extends PrismaSkillAdapter {}

  return new PrismaSkillAdapterMocked()
}

describe('DbSkillModelAdapter', () => {
  it('should adapt correctly', () => {
    const sut = makeSut()

    const repoData = mockPrismaSkillResult()
    const model = sut.adapt(repoData)

    const { id, title, deletedAt } = repoData

    const expectedModel: Skill = {
      id,
      title,
      deletedAt,
    }

    expect(model).toEqual(expectedModel)
  })
})
