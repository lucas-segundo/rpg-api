import { ClassUpdaterRepoParams } from 'app/interfaces/class/ClassUpdaterRepo'
import { mockClassUpdaterRepo } from 'app/interfaces/class/ClassUpdaterRepo/mock'
import { mockClassRepo } from 'app/models/ClassRepo/mock'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import {
  mockClassUpdaterParams,
  mockClassUpdaterIdentifier,
} from 'domain/useCases/class/ClassUpdater/mock'
import { DbClassUpdater } from '.'
import { mockDbClassAdapter } from '../../../adapters/DbClassAdapter/mock'

const makeSut = () => {
  const repo = mockClassUpdaterRepo()
  const params = mockClassUpdaterParams()
  const identifier = mockClassUpdaterIdentifier()
  const modelAdapter = mockDbClassAdapter()

  const sut = new DbClassUpdater(repo)

  return {
    sut,
    repo,
    params,
    identifier,
    modelAdapter,
  }
}

describe('DbClassUpdater', () => {
  it('should call class Updater repo with right params', async () => {
    const { sut, repo, params, identifier } = makeSut()

    repo.update.mockResolvedValue(mockClassRepo())
    const repoParams: ClassUpdaterRepoParams = {
      ...params,
    }

    await sut.update(identifier, repoParams)

    expect(repo.update).toBeCalledWith(identifier, repoParams)
  })

  it('should return class', async () => {
    const { sut, repo, params, identifier, modelAdapter } = makeSut()

    const repoResult = mockClassRepo()
    repo.update.mockResolvedValue(repoResult)

    const classReaded = await sut.update(identifier, params)

    const expectedClass = modelAdapter.adapt(repoResult)

    expect(classReaded).toEqual(expectedClass)
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
