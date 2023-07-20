import { mockClassReaderRepo } from 'app/interfaces/class/ClassReaderRepo/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockClass } from 'domain/models/Class/mock'
import { mockClassReaderParams } from 'domain/useCases/class/ClassReader/mock'
import { DbClassReader } from '.'

const makeSut = () => {
  const repo = mockClassReaderRepo()
  const sut = new DbClassReader(repo)
  const params = mockClassReaderParams()
  const repoResult = mockClass()

  return {
    sut,
    repo,
    repoResult,
    params,
  }
}

describe('DbClassReader', () => {
  it('should call class reader repo with right params', async () => {
    const { sut, repo, params } = makeSut()

    await sut.read(params)

    expect(repo.read).toBeCalledWith(params)
  })

  it('should return class', async () => {
    const { sut, repo, params, repoResult } = makeSut()

    repo.read.mockResolvedValue(repoResult)

    const data = await sut.read(params)

    expect(data).toEqual(repoResult)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo } = makeSut()

    repo.read.mockRejectedValue(new Error())

    const promise = sut.read(mockClassReaderParams())
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })
})
