import { mockSkillReaderRepo } from 'app/interfaces/skill/SkillReaderRepo/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockSkill } from 'domain/models/Skill/mock'
import { mockSkillReaderParams } from 'domain/useCases/skill/SkillReader/mock'
import { DbSkillReader } from '.'

const makeSut = () => {
  const repo = mockSkillReaderRepo()
  const params = mockSkillReaderParams()
  const sut = new DbSkillReader(repo)
  const repoResult = mockSkill()

  return {
    sut,
    repo,
    repoResult,
    params,
  }
}

describe('DbSkillReader', () => {
  it('should call skill reader repo with right params', async () => {
    const { sut, repo, params } = makeSut()

    await sut.read(params)

    expect(repo.read).toBeCalledWith(params)
  })

  it('should return skill', async () => {
    const { sut, repo, repoResult } = makeSut()

    repo.read.mockResolvedValue(repoResult)

    const data = await sut.read(mockSkillReaderParams())

    expect(data).toEqual(repoResult)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo } = makeSut()

    repo.read.mockRejectedValue(new Error())

    const promise = sut.read(mockSkillReaderParams())
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })
})
