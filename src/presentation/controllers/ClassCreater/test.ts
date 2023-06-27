import { faker } from '@faker-js/faker'
import { mockClass } from 'domain/models/Class/mock'
import {
  mockClassCreater,
  mockClassCreaterParams,
} from 'domain/useCase/ClassCreater/mock'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpErrorResponse, HttpResponse } from 'presentation/interfaces/Http'
import { ValidationParams } from 'presentation/interfaces/Validation'
import { mockValidation } from 'presentation/interfaces/Validation/mock'
import { ClassCreaterController } from '.'

const makeSut = () => {
  const classCreater = mockClassCreater()
  const validation = mockValidation()
  const sut = new ClassCreaterController(classCreater, validation)

  validation.validate.mockReturnValue([])

  return {
    sut,
    classCreater,
    validation,
  }
}

describe('ClassCreaterController', () => {
  it('should call class creater with right params', async () => {
    const { sut, classCreater } = makeSut()

    const params = mockClassCreaterParams()
    await sut.handle(params)

    expect(classCreater.create).toBeCalledWith(params)
  })

  it('should return http response with data', async () => {
    const { sut, classCreater } = makeSut()

    const classCreated = mockClass()
    classCreater.create.mockResolvedValue(classCreated)

    const httpResponse: HttpResponse = {
      data: classCreated,
      statusCode: HttpStatusCode.OK,
    }

    const params = mockClassCreaterParams()
    const result = await sut.handle(params)

    expect(result).toEqual(httpResponse)
  })

  it('should return http error if something failed', async () => {
    const { sut, classCreater } = makeSut()

    const error = new Error(faker.lorem.words())
    classCreater.create.mockRejectedValue(error)

    const httpErrorResponse: HttpErrorResponse = {
      errors: [error.message],
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    }

    const result = await sut.handle(mockClassCreaterParams())

    expect(result).toEqual(httpErrorResponse)
  })

  it('should call validation with right params', async () => {
    const { sut, validation } = makeSut()
    const params = mockClassCreaterParams()

    const validationParams: ValidationParams = {
      field: 'title',
      value: params.title,
    }

    await sut.handle(params)

    expect(validation.validate).toBeCalledWith(validationParams)
  })

  it('should return http error if it has validations errors', async () => {
    const { sut, validation } = makeSut()

    const errorMessages = [faker.lorem.words()]
    validation.validate.mockReturnValue(errorMessages)

    const params = mockClassCreaterParams()
    const result = await sut.handle(params)

    const httpErrorResponse: HttpErrorResponse = {
      errors: errorMessages,
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    expect(result).toEqual(httpErrorResponse)
  })
})
