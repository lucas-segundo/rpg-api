import { ClassCreaterRepoParams } from 'app/interfaces/class/ClassCreaterRepo'
import { mockClassCreaterRepo } from 'app/interfaces/class/ClassCreaterRepo/mock'
import { ClassRepo } from 'app/models/ClassRepo'
import { mockClassRepo } from 'app/models/ClassRepo/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockClassCreaterParams } from 'domain/useCases/class/ClassCreater/mock'
import { DbClassCreater } from '.'
import { mockDbClassAdapter } from '../../../adapters/DbClassAdapter/mock'

const makeSut = () => {
  const repo = mockClassCreaterRepo()
  const sut = new DbClassCreater(repo)
  const repoResult: ClassRepo = mockClassRepo()
  const modelAdapter = mockDbClassAdapter()

  return {
    sut,
    repo,
    repoResult,
    modelAdapter,
  }
}

describe('DbClassCreater', () => {
  it('should call class creater repo with right params', async () => {
    const { sut, repo, repoResult } = makeSut()

    repo.create.mockResolvedValue(repoResult)

    const params = mockClassCreaterParams()
    const repoParams: ClassCreaterRepoParams = {
      title: params.title,
    }

    await sut.create(repoParams)

    expect(repo.create).toBeCalledWith(repoParams)
  })

  it('should return class created', async () => {
    const { sut, repo, repoResult, modelAdapter } = makeSut()

    repo.create.mockResolvedValue(repoResult)

    const data = await sut.create(mockClassCreaterParams())

    const expectedData = modelAdapter.adapt(repoResult)

    expect(data).toEqual(expectedData)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo } = makeSut()

    repo.create.mockRejectedValue(new Error())

    const promise = sut.create(mockClassCreaterParams())
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })
})
