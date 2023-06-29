import {
  ClassReaderRepoParams,
  ClassReaderRepoResult,
} from 'app/interfaces/ClassReaderRepo'
import {
  mockClassReaderRepo,
  mockClassReaderRepoResult,
} from 'app/interfaces/ClassReaderRepo/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import { mockClassReaderParams } from 'domain/useCases/ClassReader/mock'
import { DbClassReader } from '.'

const makeSut = () => {
  const repo = mockClassReaderRepo()
  const sut = new DbClassReader(repo)

  return {
    sut,
    repo,
  }
}

describe('DbClassReader', () => {
  it('should call class reader repo with right params', async () => {
    const { sut, repo } = makeSut()

    const params = mockClassReaderParams()
    const repoParams: ClassReaderRepoParams = {
      id: params.id,
    }

    await sut.read(repoParams)

    expect(repo.read).toBeCalledWith(repoParams)
  })

  it('should return class', async () => {
    const { sut, repo } = makeSut()

    const repoResult: ClassReaderRepoResult = mockClassReaderRepoResult()
    repo.read.mockResolvedValue(repoResult)

    const classReaded = await sut.read(mockClassReaderParams())

    const expectedClass: Class = repoResult

    expect(classReaded).toEqual(expectedClass)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo } = makeSut()

    repo.read.mockRejectedValue(new Error())

    const promise = sut.read(mockClassReaderParams())
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })
})
