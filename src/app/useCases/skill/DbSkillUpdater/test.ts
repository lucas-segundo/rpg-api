import { mockSkillUpdaterRepo } from 'app/interfaces/skill/SkillUpdaterRepo/mock'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockSkill } from 'domain/models/Skill/mock'
import {
  mockSkillUpdaterParams,
  mockSkillUpdaterIdentifier,
} from 'domain/useCases/skill/SkillUpdater/mock'
import { DbSkillUpdater } from '.'

const makeSut = () => {
  const repo = mockSkillUpdaterRepo()
  const params = mockSkillUpdaterParams()
  const identifier = mockSkillUpdaterIdentifier()
  const repoResult = mockSkill()

  const sut = new DbSkillUpdater(repo)

  return {
    sut,
    repo,
    params,
    identifier,
    repoResult,
  }
}

describe('DbSkillUpdater', () => {
  it('should call skill Updater repo with right params', async () => {
    const { sut, repo, params, identifier, repoResult } = makeSut()

    repo.update.mockResolvedValue(repoResult)

    await sut.update(identifier, params)

    expect(repo.update).toBeCalledWith(identifier, params)
  })

  it('should return skill', async () => {
    const { sut, repo, params, identifier, repoResult } = makeSut()

    repo.update.mockResolvedValue(repoResult)

    const data = await sut.update(identifier, params)

    expect(data).toEqual(repoResult)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo, params, identifier } = makeSut()

    repo.update.mockRejectedValue(new Error())

    const promise = sut.update(identifier, params)
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })

  it('should throw not found error if skill repo throws', async () => {
    const { sut, repo, params, identifier } = makeSut()

    repo.update.mockRejectedValue(new NotFoundError('Skill'))

    const promise = sut.update(identifier, params)
    await expect(promise).rejects.toBeInstanceOf(NotFoundError)
  })
})
