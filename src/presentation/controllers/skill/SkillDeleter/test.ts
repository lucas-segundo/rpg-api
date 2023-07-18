import { faker } from '@faker-js/faker'
import { mockSkill } from 'domain/models/Skill/mock'
import {
  mockSkillDeleter,
  mockSkillDeleterParams,
} from 'domain/useCases/skill/SkillDeleter/mock'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpErrorResponse, HttpResponse } from 'presentation/interfaces/Http'
import {
  ValidationError,
  ValidationParams,
} from 'presentation/interfaces/Validation'
import { mockValidation } from 'presentation/interfaces/Validation/mock'
import { SkillDeleterController } from '.'

const makeSut = () => {
  const skillDeleter = mockSkillDeleter()
  const validation = mockValidation()
  const sut = new SkillDeleterController(skillDeleter, validation)

  const params = mockSkillDeleterParams()

  validation.validate.mockReturnValue([])

  return {
    skillDeleter,
    sut,
    validation,
    params,
  }
}

describe('SkillDeleterController', () => {
  it('should call skill Deleter with right params', async () => {
    const { sut, skillDeleter, params } = makeSut()

    await sut.handle(params)

    expect(skillDeleter.delete).toBeCalledWith(params)
  })

  it('should return http response with data', async () => {
    const { sut, skillDeleter, params } = makeSut()

    const skillDeleted = mockSkill()
    skillDeleter.delete.mockResolvedValue(skillDeleted)

    const httpResponse: HttpResponse = {
      data: skillDeleted,
      statusCode: HttpStatusCode.OK,
    }

    const result = await sut.handle(params)

    expect(result).toEqual(httpResponse)
  })

  it('should return http error if something failed', async () => {
    const { sut, skillDeleter, params } = makeSut()

    const error = new Error(faker.lorem.words())
    skillDeleter.delete.mockRejectedValue(error)

    const httpErrorResponse: HttpErrorResponse = {
      errors: [error.message],
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    }

    const result = await sut.handle(params)

    expect(result).toEqual(httpErrorResponse)
  })

  it('should call validation with right params', async () => {
    const { sut, validation, params } = makeSut()

    const expectedParams: ValidationParams[] = [
      {
        field: 'id',
        value: params.id,
      },
    ]

    await sut.handle(params)

    expect(validation.validate).toBeCalledWith(expectedParams)
  })

  it('should return http error if it has validations errors', async () => {
    const { sut, validation, params } = makeSut()

    const errors: ValidationError[] = [
      { field: faker.database.column(), errors: [faker.lorem.words()] },
    ]
    validation.validate.mockReturnValueOnce(errors)

    const result = await sut.handle(params)

    const httpErrorResponse: HttpErrorResponse = {
      errors,
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    expect(result).toEqual(httpErrorResponse)
  })
})
