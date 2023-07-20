import { mockClassCreaterParams } from 'domain/useCases/class/ClassCreater/mock'
import { prismaMock } from 'infra/prisma/mock'
import { mockPrismaClassResult } from 'infra/prisma/models/ClassResult/mock'
import { PrismaClassCreaterRepo } from '.'

const makeSut = () => {
  const sut = new PrismaClassCreaterRepo()

  const params = mockClassCreaterParams()
  const classRepo = mockPrismaClassResult()

  return {
    sut,
    params,
    classRepo,
  }
}

describe('PrismaClassCreaterRepo', () => {
  it('should call create with right params', async () => {
    const { sut, params } = makeSut()

    prismaMock.class.create.mockResolvedValue(mockPrismaClassResult())

    await sut.create(params)

    expect(prismaMock.class.create).toBeCalledWith({
      data: {
        title: params.title,
      },
      include: { classesSkills: { include: { skill: true } } },
    })
  })

  it('should return class created', async () => {
    const { sut, params, classRepo } = makeSut()

    prismaMock.class.create.mockResolvedValue(classRepo)

    const result = await sut.create(params)

    const expectedResult = sut.adapt(classRepo)

    expect(result).toEqual(expectedResult)
  })
})
