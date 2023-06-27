import {
  ClassCreaterRepoParams,
  ClassCreaterRepoResult,
} from 'app/interfaces/ClassCreaterRepo'
import {
  mockClassCreaterRepo,
  mockClassCreaterRepoResult,
} from 'app/interfaces/ClassCreaterRepo/mock'
import { Class } from 'domain/models/Class'
import { mockClassCreaterParams } from 'domain/useCase/ClassCreater/mock'
import { DbClassCreater } from '.'

const makeSut = () => {
  const repo = mockClassCreaterRepo()
  const sut = new DbClassCreater(repo)

  return {
    sut,
    repo,
  }
}

describe('DbClassCreater', () => {
  it('should call class creater repo with right params', async () => {
    const { sut, repo } = makeSut()

    const params = mockClassCreaterParams()
    const repoParams: ClassCreaterRepoParams = {
      title: params.title,
    }

    await sut.create(repoParams)

    expect(repo.create).toBeCalledWith(repoParams)
  })

  it('should return class created', async () => {
    const { sut, repo } = makeSut()

    const repoResult: ClassCreaterRepoResult = mockClassCreaterRepoResult()
    repo.create.mockResolvedValue(repoResult)

    const classCreated = await sut.create(mockClassCreaterParams())

    const expectedClass: Class = repoResult

    expect(classCreated).toEqual(expectedClass)
  })
})
