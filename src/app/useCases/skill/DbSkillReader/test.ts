import { SkillReaderRepoParams } from 'app/interfaces/skill/SkillReaderRepo'
import { mockSkillReaderRepo } from 'app/interfaces/skill/SkillReaderRepo/mock'
import { mockSkillRepo } from 'app/models/SkillRepo/mock'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { mockSkillReaderParams } from 'domain/useCases/skill/SkillReader/mock'
import { DbSkillReader } from '.'
import { mockDbSkillAdapter } from '../../../adapters/DbSkillAdapter/mock'

const makeSut = () => {
  const repo = mockSkillReaderRepo()
  const sut = new DbSkillReader(repo)
  const modelAdapter = mockDbSkillAdapter()

  return {
    sut,
    repo,
    modelAdapter,
  }
}

describe('DbSkillReader', () => {
  it('should call skill reader repo with right params', async () => {
    const { sut, repo } = makeSut()

    const params = mockSkillReaderParams()
    const repoParams: SkillReaderRepoParams = {
      id: params.id,
    }

    await sut.read(repoParams)

    expect(repo.read).toBeCalledWith(repoParams)
  })

  it('should return skill', async () => {
    const { sut, repo, modelAdapter } = makeSut()

    const repoResult = mockSkillRepo()
    repo.read.mockResolvedValue(repoResult)

    const skillReaded = await sut.read(mockSkillReaderParams())

    const expectedSkill = modelAdapter.adapt(repoResult)

    expect(skillReaded).toEqual(expectedSkill)
  })

  it('should throw unexpected error if something failed', async () => {
    const { sut, repo } = makeSut()

    repo.read.mockRejectedValue(new Error())

    const promise = sut.read(mockSkillReaderParams())
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError)
  })
})
