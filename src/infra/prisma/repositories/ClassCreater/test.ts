import { mockClassCreaterParams } from 'domain/useCases/ClassCreater/mock'
import { prismaMock } from 'infra/prisma/mock'
import { mockDbClass } from 'infra/prisma/mocks/class'
import { PrismaClassCreaterRepo } from '.'

describe('PrismaClassCreaterRepo', () => {
  it('should call create with right params', async () => {
    const sut = new PrismaClassCreaterRepo()

    prismaMock.class.create.mockResolvedValue(mockDbClass())

    const params = mockClassCreaterParams()
    await sut.create(params)

    expect(prismaMock.class.create).toBeCalledWith({
      data: {
        title: params.title,
      },
    })
  })
})
