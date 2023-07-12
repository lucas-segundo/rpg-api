import { faker } from '@faker-js/faker'
import { mockClass } from 'domain/models/Class/mock'
import {
  mockClassDeleter,
  mockClassDeleterParams,
} from 'domain/useCases/class/ClassDeleter/mock'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpErrorResponse, HttpResponse } from 'presentation/interfaces/Http'
import {
  ValidationError,
  ValidationParams,
} from 'presentation/interfaces/Validation'
import { mockValidation } from 'presentation/interfaces/Validation/mock'
import { ClassDeleterController } from '.'

const makeSut = () => {
  const classDeleter = mockClassDeleter()
  const validation = mockValidation()
  const sut = new ClassDeleterController(classDeleter, validation)

  const params = mockClassDeleterParams()

  validation.validate.mockReturnValue([])

  return {
    classDeleter,
    sut,
    validation,
    params,
  }
}

describe('ClassDeleterController', () => {
  it('should call class Deleter with right params', async () => {
    const { sut, classDeleter, params } = makeSut()

    await sut.handle(params)

    expect(classDeleter.delete).toBeCalledWith(params)
  })

  it('should return http response with data', async () => {
    const { sut, classDeleter, params } = makeSut()

    const classUptaded = mockClass()
    classDeleter.delete.mockResolvedValue(classUptaded)

    const httpResponse: HttpResponse = {
      data: classUptaded,
      statusCode: HttpStatusCode.OK,
    }

    const result = await sut.handle(params)

    expect(result).toEqual(httpResponse)
  })

  it('should return http error if something failed', async () => {
    const { sut, classDeleter, params } = makeSut()

    const error = new Error(faker.lorem.words())
    classDeleter.delete.mockRejectedValue(error)

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
