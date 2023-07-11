import { Class } from 'domain/models/Class'
import { mockClassCreaterParams } from 'domain/useCases/ClassCreater/mock'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import * as request from 'supertest'

describe('Classes (e2e)', () => {
  const url = process.env.APP_URL
  const path = '/classes'
  let classCreated: Class

  describe('POST /classes', () => {
    it('should create a new class and return it', () => {
      const classToCreate = mockClassCreaterParams()

      return request(url)
        .post(path)
        .send(classToCreate)
        .expect(HttpStatusCode.CREATED)
        .expect((response: request.Response) => {
          classCreated = response.body.data

          expect(classCreated).toHaveProperty('title', classToCreate.title)
        })
    })
  })

  describe('GET /classes', () => {
    it('should get one class by identifier', () => {
      return request(url)
        .get(path + '/' + classCreated.id)
        .expect(HttpStatusCode.OK)
        .expect((response: request.Response) => {
          expect(response.body.data).toEqual(classCreated)
        })
    })
  })
})
