import { mockSkillCreaterRepo } from 'app/interfaces/skill/SkillCreaterRepo/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockSkill } from 'domain/models/Skill/mock'
import { mockSkillCreaterParams } from 'domain/useCases/skill/SkillCreater/mock'
import { DbSkillCreater } from '.'

const makeSut = () => {
  const repo = mockSkillCreaterRepo()
  const sut = new DbSkillCreater(repo)
  const repoResult = mockSkill()
  const params = mockSkillCreaterParams()

  return {
    sut,
    repo,
    repoResult,
    params,
  }
}

describe('DbSkillCreater', () => {
  it('should call skill creater repo with right params', async () => {
    const { sut, repo, repoResult, params } = makeSut()

    repo.create.mockResolvedValue(repoResult)

    await sut.create(params)

    expect(repo.create).toBeCalledWith(params)
  })

  it('should return skill created', async () => {
    const { sut, repo, repoResult, params } = makeSut()

    repo.create.mockResolvedValue(repoResult)

    const data = await sut.create(params)

    expect(data).toEqual(repoResult)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo, params } = makeSut()

    repo.create.mockRejectedValue(new Error())

    const promise = sut.create(params)
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })
})
