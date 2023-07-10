import { mockClassRepo } from 'app/models/ClassRepo/mock'
import { Class } from 'domain/models/Class'
import { mockDbClassAdapter } from './mock'

describe('DbClassModelAdapter', () => {
  it('should adapt correctly', () => {
    const sut = mockDbClassAdapter()

    const repoData = mockClassRepo()
    const model = sut.adapt(repoData)

    const { id, title, deletedAt } = repoData
    const expectedModel: Class = {
      id,
      title,
      deletedAt,
    }

    expect(model).toEqual(expectedModel)
  })
})
