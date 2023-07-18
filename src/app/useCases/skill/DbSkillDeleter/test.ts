import { SkillDeleterRepoParams } from 'app/interfaces/skill/SkillDeleterRepo'
import { mockSkillDeleterRepo } from 'app/interfaces/skill/SkillDeleterRepo/mock'
import { mockSkillRepo } from 'app/models/SkillRepo/mock'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockSkillDeleterParams } from 'domain/useCases/skill/SkillDeleter/mock'
import { DbSkillDeleter } from '.'
import { mockDbSkillAdapter } from '../../../adapters/DbSkillAdapter/mock'

const makeSut = () => {
  const repo = mockSkillDeleterRepo()
  const params = mockSkillDeleterParams()
  const modelAdapter = mockDbSkillAdapter()

  const sut = new DbSkillDeleter(repo)

  return {
    sut,
    repo,
    params,
    modelAdapter,
  }
}

describe('DbSkillDeleter', () => {
  it('should call skill Deleter repo with right params', async () => {
    const { sut, repo, params } = makeSut()

    repo.delete.mockResolvedValue(mockSkillRepo())
    const repoParams: SkillDeleterRepoParams = {
      ...params,
    }

    await sut.delete(repoParams)

    expect(repo.delete).toBeCalledWith(repoParams)
  })

  it('should return skill', async () => {
    const { sut, repo, params, modelAdapter } = makeSut()

    const repoResult = mockSkillRepo()
    repo.delete.mockResolvedValue(repoResult)

    const data = await sut.delete(params)

    const expectedData = modelAdapter.adapt(repoResult)

    expect(data).toEqual(expectedData)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo, params } = makeSut()

    repo.delete.mockRejectedValue(new Error())

    const promise = sut.delete(params)
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })

  it('should throw not found error if skill repo throws', async () => {
    const { sut, repo, params } = makeSut()

    repo.delete.mockRejectedValue(new NotFoundError('Skill'))

    const promise = sut.delete(params)
    await expect(promise).rejects.toBeInstanceOf(NotFoundError)
  })
})
