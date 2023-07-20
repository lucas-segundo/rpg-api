import { mockClassDeleterRepo } from 'app/interfaces/class/ClassDeleterRepo/mock'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockClass } from 'domain/models/Class/mock'
import { mockClassDeleterParams } from 'domain/useCases/class/ClassDeleter/mock'
import { DbClassDeleter } from '.'

const makeSut = () => {
  const repo = mockClassDeleterRepo()
  const params = mockClassDeleterParams()
  const repoResult = mockClass()

  const sut = new DbClassDeleter(repo)

  return {
    sut,
    repo,
    params,
    repoResult,
  }
}

describe('DbClassDeleter', () => {
  it('should call class Deleter repo with right params', async () => {
    const { sut, repo, params, repoResult } = makeSut()

    repo.delete.mockResolvedValue(repoResult)

    await sut.delete(params)

    expect(repo.delete).toBeCalledWith(params)
  })

  it('should return class', async () => {
    const { sut, repo, params, repoResult } = makeSut()

    repo.delete.mockResolvedValue(repoResult)

    const data = await sut.delete(params)

    expect(data).toEqual(repoResult)
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
