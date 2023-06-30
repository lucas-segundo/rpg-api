import { mockClassReaderRepoParams } from 'app/interfaces/ClassReaderRepo/mock'
import { mockClassRepo } from 'app/models/ClassRepo/mock'
import { prismaMock } from 'infra/prisma/mock'
import { PrismaClassReaderRepo } from '.'

describe('PrismaClassReaderRepo', () => {
  it('should call read with right params', async () => {
    const sut = new PrismaClassReaderRepo()

    prismaMock.class.create.mockResolvedValue(mockClassRepo())

    const params = mockClassReaderRepoParams()
    await sut.read(params)

    expect(prismaMock.class.findFirst).toBeCalledWith({
      where: {
        id: params.id,
      },
    })
  })

  it('should return class', async () => {
    const sut = new PrismaClassReaderRepo()

    const classRepo = mockClassRepo()
    prismaMock.class.findFirst.mockResolvedValue(classRepo)

    const params = mockClassReaderRepoParams()
    const result = await sut.read(params)

    expect(result).toEqual(classRepo)
  })
})
