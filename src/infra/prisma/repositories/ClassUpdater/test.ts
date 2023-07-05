import {
  mockClassUpdaterRepoParams,
  mockClassUpdaterRepoIdentifier,
} from 'app/interfaces/ClassUpdaterRepo/mock'
import { mockClassRepo } from 'app/models/ClassRepo/mock'
import { prismaMock } from 'infra/prisma/mock'
import { PrismaClassUpdaterRepo } from '.'

const makeSut = () => {
  const sut = new PrismaClassUpdaterRepo()

  const params = mockClassUpdaterRepoParams()
  const identifier = mockClassUpdaterRepoIdentifier()
  const classRepo = mockClassRepo()

  return {
    sut,
    params,
    identifier,
    classRepo,
  }
}

describe('PrismaClassUpdaterRepo', () => {
  it('should call update with right params', async () => {
    const { sut, params, identifier, classRepo } = makeSut()

    prismaMock.class.create.mockResolvedValue(classRepo)

    await sut.update(identifier, params)

    expect(prismaMock.class.update).toBeCalledWith({
      where: {
        id: identifier.id,
      },
      data: params,
    })
  })

  it('should return class', async () => {
    const { sut, params, identifier, classRepo } = makeSut()

    prismaMock.class.update.mockResolvedValue(classRepo)

    const result = await sut.update(identifier, params)

    expect(result).toEqual(classRepo)
  })
})
