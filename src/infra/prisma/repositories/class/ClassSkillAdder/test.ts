import { mockClassSkillAdderParams } from 'domain/useCases/class/ClassSkillAdder/mock'
import { prismaMock } from 'infra/prisma/mock'
import { mockPrismaClassesSkillsResult } from 'infra/prisma/models/ClassSkillResult/mock'
import { PrismaClassSkillAdderRepo } from '.'

const makeSut = () => {
  const sut = new PrismaClassSkillAdderRepo()

  const params = mockClassSkillAdderParams()
  const classSkillRepo = mockPrismaClassesSkillsResult()

  return {
    sut,
    params,
    classSkillRepo,
  }
}

describe('PrismaClassSkillAdderRepo', () => {
  it('should call create with right params', async () => {
    const { sut, params, classSkillRepo } = makeSut()

    prismaMock.classesSkills.create.mockResolvedValue(classSkillRepo)

    await sut.add(params)

    expect(prismaMock.classesSkills.create).toBeCalledWith({
      data: params,
      include: {
        class: {
          include: {
            classesSkills: {
              include: {
                skill: true,
              },
            },
          },
        },
      },
    })
  })

  it('should return class created', async () => {
    const { sut, params, classSkillRepo } = makeSut()

    prismaMock.classesSkills.create.mockResolvedValue(classSkillRepo)

    const result = await sut.add(params)

    const expectedResult = sut.adapt(classSkillRepo.class)

    expect(result).toEqual(expectedResult)
  })
})
