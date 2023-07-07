import { ClassCreaterRepoParams } from 'app/interfaces/ClassCreaterRepo'
import { mockClassCreaterRepo } from 'app/interfaces/ClassCreaterRepo/mock'
import { ClassRepo } from 'app/models/ClassRepo'
import { mockClassRepo } from 'app/models/ClassRepo/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import { mockClassCreaterParams } from 'domain/useCases/ClassCreater/mock'
import { DbClassCreater } from '.'

const makeSut = () => {
  const repo = mockClassCreaterRepo()
  const sut = new DbClassCreater(repo)
  const repoResult: ClassRepo = mockClassRepo()

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
    const repoParams: ClassCreaterRepoParams = {
      title: params.title,
    }

    await sut.create(repoParams)

    expect(repo.create).toBeCalledWith(repoParams)
  })

  it('should return class created', async () => {
    const { sut, repo, repoResult } = makeSut()

    repo.create.mockResolvedValue(repoResult)

    const classCreated = await sut.create(mockClassCreaterParams())

    const { id, title } = repoResult
    const expectedClass: Class = {
      id,
      title,
    }

    expect(classCreated).toEqual(expectedClass)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo } = makeSut()

    repo.create.mockRejectedValue(new Error())

    const promise = sut.create(mockClassCreaterParams())
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })
})
