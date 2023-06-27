import { ClassCreaterRepoParams } from 'app/interfaces/ClassCreaterRepo'
import { mockClassCreaterRepo } from 'app/interfaces/ClassCreaterRepo/mock'
import { mockClassCreaterParams } from 'domain/useCase/ClassCreater/mock'
import { DbClassCreater } from '.'

describe('DbClassCreater', () => {
  it('should call class creater repo with right params', async () => {
    const repo = mockClassCreaterRepo()
    const sut = new DbClassCreater(repo)

    const params = mockClassCreaterParams()
    const repoParams: ClassCreaterRepoParams = {
      title: params.title,
    }

    await sut.create(repoParams)

    expect(repo.create).toBeCalledWith(repoParams)
  })
})
