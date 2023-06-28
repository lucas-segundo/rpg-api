import { faker } from '@faker-js/faker'
import { mockClassCreaterParams } from 'domain/useCases/ClassCreater/mock'
import { prismaMock } from 'infra/prisma/mock'
import { PrismaClassCreaterRepo } from '.'

describe('PrismaClassCreaterRepo', () => {
  it('should call create with right params', async () => {
    const sut = new PrismaClassCreaterRepo()

    prismaMock.class.create.mockResolvedValue({
      id: faker.number.int(),
      title: faker.lorem.word(),
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.anytime(),
      deletedAt: null,
    })

    const params = mockClassCreaterParams()
    await sut.create(params)

    expect(prismaMock.class.create).toBeCalledWith({
      data: {
        title: params.title,
      },
    })
  })
})
