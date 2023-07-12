import { ClassReaderRepoParams } from 'app/interfaces/class/ClassReaderRepo'
import { mockClassReaderRepo } from 'app/interfaces/class/ClassReaderRepo/mock'
import { mockClassRepo } from 'app/models/ClassRepo/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockClassReaderParams } from 'domain/useCases/class/ClassReader/mock'
import { DbClassReader } from '.'
import { mockDbClassAdapter } from '../../../adapters/DbClassAdapter/mock'

const makeSut = () => {
  const repo = mockClassReaderRepo()
  const sut = new DbClassReader(repo)
  const modelAdapter = mockDbClassAdapter()

  return {
    sut,
    repo,
    modelAdapter,
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
    const { sut, repo, modelAdapter } = makeSut()

    const repoResult = mockClassRepo()
    repo.read.mockResolvedValue(repoResult)

    const classReaded = await sut.read(mockClassReaderParams())

    const expectedClass = modelAdapter.adapt(repoResult)

    expect(classReaded).toEqual(expectedClass)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo } = makeSut()

    repo.read.mockRejectedValue(new Error())

    const promise = sut.read(mockClassReaderParams())
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })
})
