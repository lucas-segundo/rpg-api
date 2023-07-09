import { ClassDeleterRepoParams } from 'app/interfaces/ClassDeleterRepo'
import { mockClassDeleterRepo } from 'app/interfaces/ClassDeleterRepo/mock'
import { mockClassRepo } from 'app/models/ClassRepo/mock'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockClassDeleterParams } from 'domain/useCases/ClassDeleter/mock'
import { DbClassDeleter } from '.'
import { mockDbClassAdapter } from '../../../adapters/DbClassAdapter/mock'

const makeSut = () => {
  const repo = mockClassDeleterRepo()
  const params = mockClassDeleterParams()
  const modelAdapter = mockDbClassAdapter()

  const sut = new DbClassDeleter(repo)

  return {
    sut,
    repo,
    params,
    modelAdapter,
  }
}

describe('DbClassDeleter', () => {
  it('should call class Deleter repo with right params', async () => {
    const { sut, repo, params } = makeSut()

    repo.delete.mockResolvedValue(mockClassRepo())
    const repoParams: ClassDeleterRepoParams = {
      ...params,
    }

    await sut.delete(repoParams)

    expect(repo.delete).toBeCalledWith(repoParams)
  })

  it('should return class', async () => {
    const { sut, repo, params, modelAdapter } = makeSut()

    const repoResult = mockClassRepo()
    repo.delete.mockResolvedValue(repoResult)

    const classData = await sut.delete(params)

    const expectedClass = modelAdapter.adapt(repoResult)

    expect(classData).toEqual(expectedClass)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo, params } = makeSut()

    repo.delete.mockRejectedValue(new Error())

    const promise = sut.delete(params)
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })

  it('should throw not found error if class repo throws', async () => {
    const { sut, repo, params } = makeSut()

    repo.delete.mockRejectedValue(new NotFoundError('Class'))

    const promise = sut.delete(params)
    await expect(promise).rejects.toBeInstanceOf(NotFoundError)
  })
})
