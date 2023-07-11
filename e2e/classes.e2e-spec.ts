import { faker } from '@faker-js/faker'
import { Class } from 'domain/models/Class'
import { mockClassCreaterParams } from 'domain/useCases/Class/ClassCreater/mock'
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

  describe('GET /classes/:id', () => {
    it('should get one class by identifier', () => {
      return request(url)
        .get(path + '/' + classCreated.id)
        .expect(HttpStatusCode.OK)
        .expect((response: request.Response) => {
          expect(response.body.data).toEqual(classCreated)
        })
    })
  })

  describe('PATCH /classes', () => {
    it('should update one class', () => {
      const patchBody: Partial<Class> = {
        title: faker.lorem.words(),
        deletedAt: faker.date.anytime(),
      }

      return request(url)
        .patch(path + '/' + classCreated.id)
        .send(patchBody)
        .expect(HttpStatusCode.OK)
        .expect((response: request.Response) => {
          expect(response.body.data).toEqual({
            ...classCreated,
            ...patchBody,
            deletedAt: patchBody.deletedAt?.toISOString(),
          })
        })
    })
  })

  describe('DELETE /classes/:id', () => {
    it('should delete one class', () => {
      return request(url)
        .delete(path + '/' + classCreated.id)
        .expect(HttpStatusCode.OK)
    })
  })
})
