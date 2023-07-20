import { mockClassSkillAdderRepo } from 'app/interfaces/class/ClassSkillAdderRepo/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockClass } from 'domain/models/Class/mock'
import { mockClassSkillAdderParams } from 'domain/useCases/class/ClassSkillAdder/mock'
import { DbClassSkillAdder } from '.'

const makeSut = () => {
  const repo = mockClassSkillAdderRepo()
  const sut = new DbClassSkillAdder(repo)
  const repoResult = mockClass()
  const params = mockClassSkillAdderParams()

  return {
    sut,
    repo,
    repoResult,
    params,
  }
}

describe('DbClassSkillAdder', () => {
  it('should call skill add repo with right params', async () => {
    const { sut, repo, repoResult, params } = makeSut()

    repo.add.mockResolvedValue(repoResult)

    await sut.add(params)

    expect(repo.add).toBeCalledWith(params)
  })

  it('should return skill added', async () => {
    const { sut, repo, repoResult } = makeSut()

    repo.add.mockResolvedValue(repoResult)

    const data = await sut.add(mockClassSkillAdderParams())

    expect(data).toEqual(repoResult)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo } = makeSut()

    repo.add.mockRejectedValue(new Error())

    const promise = sut.add(mockClassSkillAdderParams())
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })
})
