import { mockClassRepo } from 'app/models/ClassRepo/mock'
import { Class } from 'domain/models/Class'
import { mockDbClassAdapter } from './mock'

describe('DbClassModelAdapter', () => {
  it('should adapt correctly', () => {
    const sut = mockDbClassAdapter()

    const repoData = mockClassRepo()
    const model = sut.adapt(repoData)

    const { id, title, classesSkills, deletedAt } = repoData
    const skills = sut.adaptToSkill(classesSkills)

    const expectedModel: Class = {
      id,
      title,
      skills,
      deletedAt,
    }

    expect(model).toEqual(expectedModel)
  })
})
