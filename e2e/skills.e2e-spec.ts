import { faker } from '@faker-js/faker'
import { Skill } from 'domain/models/Skill'
import { mockSkillCreaterParams } from 'domain/useCases/skill/SkillCreater/mock'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import * as request from 'supertest'

describe('Skills (e2e)', () => {
  const url = process.env.APP_URL
  const path = '/skills'
  let skillCreated: Skill

  describe('POST /skills', () => {
    it('should create a new class and return it', () => {
      const skillToCreate = mockSkillCreaterParams()

      return request(url)
        .post(path)
        .send(skillToCreate)
        .expect(HttpStatusCode.CREATED)
        .expect((response: request.Response) => {
          skillCreated = response.body.data

          expect(skillCreated).toHaveProperty('title', skillToCreate.title)
        })
    })
  })

  describe('GET /skills/:id', () => {
    it('should get one class by identifier', () => {
      return request(url)
        .get(path + '/' + skillCreated.id)
        .expect(HttpStatusCode.OK)
        .expect((response: request.Response) => {
          expect(response.body.data).toEqual(skillCreated)
        })
    })
  })

  describe('PATCH /skills', () => {
    it('should update one class', () => {
      const patchBody: Partial<Skill> = {
        title: faker.lorem.words(),
        deletedAt: faker.date.anytime(),
      }

      return request(url)
        .patch(path + '/' + skillCreated.id)
        .send(patchBody)
        .expect(HttpStatusCode.OK)
        .expect((response: request.Response) => {
          expect(response.body.data).toEqual({
            ...skillCreated,
            ...patchBody,
            deletedAt: patchBody.deletedAt?.toISOString(),
          })
        })
    })
  })

  describe('DELETE /skills/:id', () => {
    it('should delete one class', () => {
      return request(url)
        .delete(path + '/' + skillCreated.id)
        .expect(HttpStatusCode.OK)
    })
  })
})
