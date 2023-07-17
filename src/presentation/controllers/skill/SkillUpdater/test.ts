import { faker } from '@faker-js/faker'
import { mockSkill } from 'domain/models/Skill/mock'
import {
  mockSkillUpdater,
  mockSkillUpdaterIdentifier,
  mockSkillUpdaterParams,
} from 'domain/useCases/skill/SkillUpdater/mock'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpErrorResponse, HttpResponse } from 'presentation/interfaces/Http'
import {
  ValidationError,
  ValidationParams,
} from 'presentation/interfaces/Validation'
import { mockValidation } from 'presentation/interfaces/Validation/mock'
import { SkillUpdaterController } from '.'

const makeSut = () => {
  const skillUpdater = mockSkillUpdater()
  const validation = mockValidation()
  const sut = new SkillUpdaterController(skillUpdater, validation)

  const identifier = mockSkillUpdaterIdentifier()
  const params = mockSkillUpdaterParams()

  validation.validate.mockReturnValue([])

  return {
    skillUpdater,
    sut,
    validation,
    identifier,
    params,
  }
}

describe('SkillUpdaterController', () => {
  it('should call class Updater with right params', async () => {
    const { sut, skillUpdater, identifier, params } = makeSut()

    await sut.handle({ identifier, params })

    expect(skillUpdater.update).toBeCalledWith(identifier, params)
  })

  it('should return http response with data', async () => {
    const { sut, skillUpdater, identifier, params } = makeSut()

    const skillUpdated = mockSkill()
    skillUpdater.update.mockResolvedValue(skillUpdated)

    const httpResponse: HttpResponse = {
      data: skillUpdated,
      statusCode: HttpStatusCode.OK,
    }

    const result = await sut.handle({ identifier, params })

    expect(result).toEqual(httpResponse)
  })

  it('should return http error if something failed', async () => {
    const { sut, skillUpdater, identifier, params } = makeSut()

    const error = new Error(faker.lorem.words())
    skillUpdater.update.mockRejectedValue(error)

    const httpErrorResponse: HttpErrorResponse = {
      errors: [error.message],
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    }

    const result = await sut.handle({ identifier, params })

    expect(result).toEqual(httpErrorResponse)
  })

  it('should call validation with right params', async () => {
    const { sut, validation, identifier, params } = makeSut()

    const expectedParams: ValidationParams[] = [
      {
        field: 'id',
        value: identifier.id,
      },
      {
        field: 'title',
        value: params.title,
      },
    ]

    await sut.handle({ identifier, params })

    expect(validation.validate).toBeCalledWith(expectedParams)
  })

  it('should return http error if it has validations errors', async () => {
    const { sut, validation, identifier, params } = makeSut()

    const errors: ValidationError[] = [
      { field: faker.database.column(), errors: [faker.lorem.words()] },
    ]
    validation.validate.mockReturnValueOnce(errors)

    const result = await sut.handle({ identifier, params })

    const httpErrorResponse: HttpErrorResponse = {
      errors,
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    expect(result).toEqual(httpErrorResponse)
  })
})
