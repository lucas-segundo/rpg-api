import { mockClassReaderParams } from 'domain/useCases/class/ClassReader/mock'
import { prismaMock } from 'infra/prisma/mock'
import { mockPrismaClassResult } from 'infra/prisma/models/ClassResult/mock'
import { PrismaClassReaderRepo } from '.'

const makeSut = () => {
  const sut = new PrismaClassReaderRepo()

  const params = mockClassReaderParams()
  const classRepo = mockPrismaClassResult()

  return {
    sut,
    params,
    classRepo,
  }
}

describe('PrismaClassReaderRepo', () => {
  it('should call read with right params', async () => {
    const { sut, params } = makeSut()

    prismaMock.class.create.mockResolvedValue(mockPrismaClassResult())

    await sut.read(params)

    expect(prismaMock.class.findFirst).toBeCalledWith({
      where: {
        id: params.id,
      },
      include: { classesSkills: { include: { skill: true } } },
    })
  })

  it('should return class', async () => {
    const { sut, params, classRepo } = makeSut()

    prismaMock.class.findFirst.mockResolvedValue(classRepo)

    const result = await sut.read(params)

    const expectedResult = sut.adapt(classRepo)
    expect(result).toEqual(expectedResult)
  })
})
