import { ClassUpdaterRepoParams } from 'app/interfaces/ClassUpdaterRepo'
import { mockClassUpdaterRepo } from 'app/interfaces/ClassUpdaterRepo/mock'
import { mockClassRepo } from 'app/models/ClassRepo/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import { mockClassUpdaterParams } from 'domain/useCases/ClassUpdater/mock'
import { DbClassUpdater } from '.'

const makeSut = () => {
  const repo = mockClassUpdaterRepo()
  const sut = new DbClassUpdater(repo)

  return {
    sut,
    repo,
  }
}

describe('DbClassUpdater', () => {
  it('should call class Updater repo with right params', async () => {
    const { sut, repo } = makeSut()

    const params = mockClassUpdaterParams()
    const repoParams: ClassUpdaterRepoParams = {
      ...params,
    }

    await sut.update(repoParams)

    expect(repo.update).toBeCalledWith(repoParams)
  })

  it('should return class', async () => {
    const { sut, repo } = makeSut()

    const repoResult = mockClassRepo()
    repo.update.mockResolvedValue(repoResult)

    const classReaded = await sut.update(mockClassUpdaterParams())

    const expectedClass: Class = repoResult

    expect(classReaded).toEqual(expectedClass)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo } = makeSut()

    repo.update.mockRejectedValue(new Error())

    const promise = sut.update(mockClassUpdaterParams())
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })
})
