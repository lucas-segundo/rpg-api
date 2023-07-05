import { ClassUpdaterRepoParams } from 'app/interfaces/ClassUpdaterRepo'
import { mockClassUpdaterRepo } from 'app/interfaces/ClassUpdaterRepo/mock'
import { mockClassRepo } from 'app/models/ClassRepo/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import {
  mockClassUpdaterParams,
  mockClassUpdaterIdentifier,
} from 'domain/useCases/ClassUpdater/mock'
import { DbClassUpdater } from '.'

const makeSut = () => {
  const repo = mockClassUpdaterRepo()
  const params = mockClassUpdaterParams()
  const identifier = mockClassUpdaterIdentifier()

  const sut = new DbClassUpdater(repo)

  return {
    sut,
    repo,
    params,
    identifier,
  }
}

describe('DbClassUpdater', () => {
  it('should call class Updater repo with right params', async () => {
    const { sut, repo, params, identifier } = makeSut()

    const repoParams: ClassUpdaterRepoParams = {
      ...params,
    }

    await sut.update(identifier, repoParams)

    expect(repo.update).toBeCalledWith(identifier, repoParams)
  })

  it('should return class', async () => {
    const { sut, repo, params, identifier } = makeSut()

    const repoResult = mockClassRepo()
    repo.update.mockResolvedValue(repoResult)

    const classReaded = await sut.update(identifier, params)

    const expectedClass: Class = repoResult

    expect(classReaded).toEqual(expectedClass)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo, params, identifier } = makeSut()

    repo.update.mockRejectedValue(new Error())

    const promise = sut.update(identifier, params)
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })
})
