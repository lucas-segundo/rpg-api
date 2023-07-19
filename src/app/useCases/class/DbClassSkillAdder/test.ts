import { ClassSkillAdderRepoParams } from 'app/interfaces/class/ClassSkillAdderRepo'
import { mockClassSkillAdderRepo } from 'app/interfaces/class/ClassSkillAdderRepo/mock'
import { ClassRepo } from 'app/models/ClassRepo'
import { mockClassRepo } from 'app/models/ClassRepo/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockClassSkillAdderParams } from 'domain/useCases/class/ClassSkillAdder/mock'
import { DbClassSkillAdder } from '.'
import { mockDbClassAdapter } from '../../../adapters/DbClassAdapter/mock'

const makeSut = () => {
  const repo = mockClassSkillAdderRepo()
  const sut = new DbClassSkillAdder(repo)
  const repoResult: ClassRepo = mockClassRepo()
  const modelAdapter = mockDbClassAdapter()

  return {
    sut,
    repo,
    repoResult,
    modelAdapter,
  }
}

describe('DbClassSkillAdder', () => {
  it('should call skill add repo with right params', async () => {
    const { sut, repo, repoResult } = makeSut()

    repo.add.mockResolvedValue(repoResult)

    const params = mockClassSkillAdderParams()
    const repoParams: ClassSkillAdderRepoParams = {
      ...params,
    }

    await sut.add(params)

    expect(repo.add).toBeCalledWith(repoParams)
  })

  it('should return skill added', async () => {
    const { sut, repo, repoResult, modelAdapter } = makeSut()

    repo.add.mockResolvedValue(repoResult)

    const data = await sut.add(mockClassSkillAdderParams())

    const expectedData = modelAdapter.adapt(repoResult)

    expect(data).toEqual(expectedData)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo } = makeSut()

    repo.add.mockRejectedValue(new Error())

    const promise = sut.add(mockClassSkillAdderParams())
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })
})
