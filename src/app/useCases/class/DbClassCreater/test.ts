import { mockClassCreaterRepo } from 'app/interfaces/class/ClassCreaterRepo/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockClass } from 'domain/models/Class/mock'
import { mockClassCreaterParams } from 'domain/useCases/class/ClassCreater/mock'
import { DbClassCreater } from '.'

const makeSut = () => {
  const repo = mockClassCreaterRepo()
  const sut = new DbClassCreater(repo)
  const repoResult = mockClass()

  return {
    sut,
    repo,
    repoResult,
  }
}

describe('DbClassCreater', () => {
  it('should call class creater repo with right params', async () => {
    const { sut, repo, repoResult } = makeSut()

    repo.create.mockResolvedValue(repoResult)

    const params = mockClassCreaterParams()

    await sut.create(params)

    expect(repo.create).toBeCalledWith(params)
  })

  it('should return class created', async () => {
    const { sut, repo, repoResult } = makeSut()

    repo.create.mockResolvedValue(repoResult)

    const data = await sut.create(mockClassCreaterParams())

    expect(data).toEqual(repoResult)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo } = makeSut()

    repo.create.mockRejectedValue(new Error())

    const promise = sut.create(mockClassCreaterParams())
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })
})
