import { mockClassCreaterParams } from 'domain/useCases/ClassCreater/mock'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import * as request from 'supertest'

describe('Classes (e2e)', () => {
  const url = process.env.APP_URL
  const path = '/classes'

  describe('POST /classes', () => {
    it('it should create a new class and return it', () => {
      const classToCreate = mockClassCreaterParams()

      return request(url)
        .post(path)
        .send(classToCreate)
        .expect(HttpStatusCode.CREATED)
        .expect((response: request.Response) => {
          expect(response.body.data).toHaveProperty(
            'title',
            classToCreate.title
          )
        })
    })
  })
})
