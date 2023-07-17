import { SkillUpdaterRepoParams } from 'app/interfaces/skill/SkillUpdaterRepo'
import { mockSkillUpdaterRepo } from 'app/interfaces/skill/SkillUpdaterRepo/mock'
import { mockSkillRepo } from 'app/models/SkillRepo/mock'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import {
  mockSkillUpdaterParams,
  mockSkillUpdaterIdentifier,
} from 'domain/useCases/skill/SkillUpdater/mock'
import { DbSkillUpdater } from '.'
import { mockDbSkillAdapter } from '../../../adapters/DbSkillAdapter/mock'

const makeSut = () => {
  const repo = mockSkillUpdaterRepo()
  const params = mockSkillUpdaterParams()
  const identifier = mockSkillUpdaterIdentifier()
  const modelAdapter = mockDbSkillAdapter()

  const sut = new DbSkillUpdater(repo)

  return {
    sut,
    repo,
    params,
    identifier,
    modelAdapter,
  }
}

describe('DbSkillUpdater', () => {
  it('should call skill Updater repo with right params', async () => {
    const { sut, repo, params, identifier } = makeSut()

    repo.update.mockResolvedValue(mockSkillRepo())
    const repoParams: SkillUpdaterRepoParams = {
      ...params,
    }

    await sut.update(identifier, repoParams)

    expect(repo.update).toBeCalledWith(identifier, repoParams)
  })

  it('should return skill', async () => {
    const { sut, repo, params, identifier, modelAdapter } = makeSut()

    const repoResult = mockSkillRepo()
    repo.update.mockResolvedValue(repoResult)

    const data = await sut.update(identifier, params)

    const expectedData = modelAdapter.adapt(repoResult)

    expect(data).toEqual(expectedData)
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
