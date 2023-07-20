import { mockClassUpdaterRepo } from 'app/interfaces/class/ClassUpdaterRepo/mock'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockClass } from 'domain/models/Class/mock'
import {
  mockClassUpdaterParams,
  mockClassUpdaterIdentifier,
} from 'domain/useCases/class/ClassUpdater/mock'
import { DbClassUpdater } from '.'

const makeSut = () => {
  const repo = mockClassUpdaterRepo()
  const params = mockClassUpdaterParams()
  const identifier = mockClassUpdaterIdentifier()
  const repoResult = mockClass()

  const sut = new DbClassUpdater(repo)

  return {
    sut,
    repo,
    params,
    identifier,
    repoResult,
  }
}

describe('DbClassUpdater', () => {
  it('should call class Updater repo with right params', async () => {
    const { sut, repo, params, identifier, repoResult } = makeSut()

    repo.update.mockResolvedValue(repoResult)

    await sut.update(identifier, params)

    expect(repo.update).toBeCalledWith(identifier, params)
  })

  it('should return class', async () => {
    const { sut, repo, params, identifier, repoResult } = makeSut()

    repo.update.mockResolvedValue(repoResult)

    const data = await sut.update(identifier, params)

    expect(data).toEqual(repoResult)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo, params, identifier } = makeSut()

    repo.update.mockRejectedValue(new Error())

    const promise = sut.update(identifier, params)
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })

  it('should throw not found error if class repo throws', async () => {
    const { sut, repo, params, identifier } = makeSut()

    repo.update.mockRejectedValue(new NotFoundError('Class'))

    const promise = sut.update(identifier, params)
    await expect(promise).rejects.toBeInstanceOf(NotFoundError)
  })
})
