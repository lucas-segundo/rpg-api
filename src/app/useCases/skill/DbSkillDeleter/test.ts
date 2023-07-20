import { mockSkillDeleterRepo } from 'app/interfaces/skill/SkillDeleterRepo/mock'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockSkill } from 'domain/models/Skill/mock'
import { mockSkillDeleterParams } from 'domain/useCases/skill/SkillDeleter/mock'
import { DbSkillDeleter } from '.'

const makeSut = () => {
  const repo = mockSkillDeleterRepo()
  const params = mockSkillDeleterParams()
  const repoResult = mockSkill()

  const sut = new DbSkillDeleter(repo)

  return {
    sut,
    repo,
    params,
    repoResult,
  }
}

describe('DbSkillDeleter', () => {
  it('should call skill Deleter repo with right params', async () => {
    const { sut, repo, params, repoResult } = makeSut()

    repo.delete.mockResolvedValue(repoResult)

    await sut.delete(params)

    expect(repo.delete).toBeCalledWith(params)
  })

  it('should return skill', async () => {
    const { sut, repo, params, repoResult } = makeSut()

    repo.delete.mockResolvedValue(repoResult)

    const data = await sut.delete(params)

    expect(data).toEqual(repoResult)
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
