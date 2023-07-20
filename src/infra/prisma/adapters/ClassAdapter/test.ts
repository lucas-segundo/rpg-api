import { Class } from 'domain/models/Class'
import { Skill } from 'domain/models/Skill'
import { mockPrismaClassResult } from 'infra/prisma/models/ClassResult/mock'
import { PrismaClassAdapter } from '.'

const makeSut = () => {
  class PrismaClassAdapterMocked extends PrismaClassAdapter {}

  return new PrismaClassAdapterMocked()
}

describe('DbClassModelAdapter', () => {
  it('should adapt correctly', () => {
    const sut = makeSut()

    const repoData = mockPrismaClassResult()
    const model = sut.adapt(repoData)

    const { id, title, classesSkills, deletedAt } = repoData
    const skills = classesSkills.map(({ skill }): Skill => {
      const { id, title, deletedAt } = skill

      return {
        id,
        title,
        deletedAt,
      }
    })

    const expectedModel: Class = {
      id,
      title,
      skills,
      deletedAt,
    }

    expect(model).toEqual(expectedModel)
  })
})
