import { faker } from '@faker-js/faker'
import { mockSkill } from 'domain/models/Skill/mock'
import {
  mockSkillCreater,
  mockSkillCreaterParams,
} from 'domain/useCases/skill/SkillCreater/mock'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpErrorResponse, HttpResponse } from 'presentation/interfaces/Http'
import { ValidationParams } from 'presentation/interfaces/Validation'
import {
  mockValidation,
  mockValidationErrors,
} from 'presentation/interfaces/Validation/mock'
import { SkillCreaterController } from '.'

const makeSut = () => {
  const SkillCreater = mockSkillCreater()
  const validation = mockValidation()
  const sut = new SkillCreaterController(SkillCreater, validation)

  validation.validate.mockReturnValue([])

  return {
    sut,
    SkillCreater,
    validation,
  }
}

describe('SkillCreaterController', () => {
  it('should call Skill creater with right params', async () => {
    const { sut, SkillCreater } = makeSut()

    const params = mockSkillCreaterParams()
    await sut.handle(params)

    expect(SkillCreater.create).toBeCalledWith(params)
  })

  it('should return http response with data', async () => {
    const { sut, SkillCreater } = makeSut()

    const SkillCreated = mockSkill()
    SkillCreater.create.mockResolvedValue(SkillCreated)

    const httpResponse: HttpResponse = {
      data: SkillCreated,
      statusCode: HttpStatusCode.CREATED,
    }

    const params = mockSkillCreaterParams()
    const result = await sut.handle(params)

    expect(result).toEqual(httpResponse)
  })

  it('should return http error if something failed', async () => {
    const { sut, SkillCreater } = makeSut()

    const error = new Error(faker.lorem.words())
    SkillCreater.create.mockRejectedValue(error)

    const httpErrorResponse: HttpErrorResponse = {
      errors: [error.message],
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    }

    const result = await sut.handle(mockSkillCreaterParams())

    expect(result).toEqual(httpErrorResponse)
  })

  it('should call validation with right params', async () => {
    const { sut, validation } = makeSut()
    const params = mockSkillCreaterParams()

    const validationParams: ValidationParams[] = [
      {
        field: 'title',
        value: params.title,
      },
    ]

    await sut.handle(params)

    expect(validation.validate).toBeCalledWith(validationParams)
  })

  it('should return http error if it has validations errors', async () => {
    const { sut, validation } = makeSut()

    const errorMessages = mockValidationErrors()
    validation.validate.mockReturnValue(errorMessages)

    const params = mockSkillCreaterParams()
    const result = await sut.handle(params)

    const httpErrorResponse: HttpErrorResponse = {
      errors: errorMessages,
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    expect(result).toEqual(httpErrorResponse)
  })
})
