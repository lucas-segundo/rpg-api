import { mockSkillRepo } from 'app/models/SkillRepo/mock'
import { Skill } from 'domain/models/Skill'
import { mockDbSkillAdapter } from './mock'

describe('DbSkillModelAdapter', () => {
  it('should adapt correctly', () => {
    const sut = mockDbSkillAdapter()

    const repoData = mockSkillRepo()
    const model = sut.adapt(repoData)

    const { id, title, deletedAt } = repoData
    const expectedModel: Skill = {
      id,
      title,
      deletedAt,
    }

    expect(model).toEqual(expectedModel)
  })
})
