import { SkillCreaterRepoParams } from 'app/interfaces/skill/SkillCreaterRepo'
import { mockSkillCreaterRepo } from 'app/interfaces/skill/SkillCreaterRepo/mock'
import { SkillRepo } from 'app/models/SkillRepo'
import { mockSkillRepo } from 'app/models/SkillRepo/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockSkillCreaterParams } from 'domain/useCases/skill/SkillCreater/mock'
import { DbSkillCreater } from '.'
import { mockDbSkillAdapter } from '../../../adapters/DbSkillAdapter/mock'

const makeSut = () => {
  const repo = mockSkillCreaterRepo()
  const sut = new DbSkillCreater(repo)
  const repoResult: SkillRepo = mockSkillRepo()
  const modelAdapter = mockDbSkillAdapter()

  return {
    sut,
    repo,
    repoResult,
    modelAdapter,
  }
}

describe('DbSkillCreater', () => {
  it('should call skill creater repo with right params', async () => {
    const { sut, repo, repoResult } = makeSut()

    repo.create.mockResolvedValue(repoResult)

    const params = mockSkillCreaterParams()
    const repoParams: SkillCreaterRepoParams = {
      title: params.title,
    }

    await sut.create(repoParams)

    expect(repo.create).toBeCalledWith(repoParams)
  })

  it('should return skill created', async () => {
    const { sut, repo, repoResult, modelAdapter } = makeSut()

    repo.create.mockResolvedValue(repoResult)

    const skillCreated = await sut.create(mockSkillCreaterParams())

    const expectedSkill = modelAdapter.adapt(repoResult)

    expect(skillCreated).toEqual(expectedSkill)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo } = makeSut()

    repo.create.mockRejectedValue(new Error())

    const promise = sut.create(mockSkillCreaterParams())
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })
})
