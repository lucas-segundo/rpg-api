import { mockClassRepo } from 'app/models/ClassRepo/mock'
import { mockClassCreaterParams } from 'domain/useCases/class/ClassCreater/mock'
import { prismaMock } from 'infra/prisma/mock'
import { PrismaClassCreaterRepo } from '.'

describe('PrismaClassCreaterRepo', () => {
  it('should call create with right params', async () => {
    const sut = new PrismaClassCreaterRepo()

    prismaMock.class.create.mockResolvedValue(mockClassRepo())

    const params = mockClassCreaterParams()
    await sut.create(params)

    expect(prismaMock.class.create).toBeCalledWith({
      data: {
        title: params.title,
      },
    })
  })

  it('should return class created', async () => {
    const sut = new PrismaClassCreaterRepo()

    const dbClassCreated = mockClassRepo()
    prismaMock.class.create.mockResolvedValue(dbClassCreated)

    const params = mockClassCreaterParams()
    const result = await sut.create(params)

    expect(result).toEqual(dbClassCreated)
  })
})
