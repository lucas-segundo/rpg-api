import { DbClassModelAdapter } from '.'
import { mockClassRepo } from 'app/models/ClassRepo/mock'
import { Class } from 'domain/models/Class'

class DbClassUseCaseMocked extends DbClassModelAdapter {}

describe('DbClassModelAdapter', () => {
  it('should adapt correctly', () => {
    const sut = new DbClassUseCaseMocked()

    const repoData = mockClassRepo()
    const model = sut.adapt(repoData)

    const { id, title } = repoData
    const expectedModel: Class = {
      id,
      title,
    }

    expect(model).toEqual(expectedModel)
  })
})
