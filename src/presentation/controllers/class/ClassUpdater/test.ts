import { faker } from '@faker-js/faker'
import { mockClass } from 'domain/models/Class/mock'
import {
  mockClassUpdater,
  mockClassUpdaterIdentifier,
  mockClassUpdaterParams,
} from 'domain/useCases/class/ClassUpdater/mock'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpErrorResponse, HttpResponse } from 'presentation/interfaces/Http'
import {
  ValidationError,
  ValidationParams,
} from 'presentation/interfaces/Validation'
import { mockValidation } from 'presentation/interfaces/Validation/mock'
import { ClassUpdaterController } from '.'

const makeSut = () => {
  const classUpdater = mockClassUpdater()
  const validation = mockValidation()
  const sut = new ClassUpdaterController(classUpdater, validation)

  const identifier = mockClassUpdaterIdentifier()
  const params = mockClassUpdaterParams()

  validation.validate.mockReturnValue([])

  return {
    classUpdater,
    sut,
    validation,
    identifier,
    params,
  }
}

describe('ClassUpdaterController', () => {
  it('should call class Updater with right params', async () => {
    const { sut, classUpdater, identifier, params } = makeSut()

    await sut.handle({ identifier, params })

    expect(classUpdater.update).toBeCalledWith(identifier, params)
  })

  it('should return http response with data', async () => {
    const { sut, classUpdater, identifier, params } = makeSut()

    const classUptaded = mockClass()
    classUpdater.update.mockResolvedValue(classUptaded)

    const httpResponse: HttpResponse = {
      data: classUptaded,
      statusCode: HttpStatusCode.OK,
    }

    const result = await sut.handle({ identifier, params })

    expect(result).toEqual(httpResponse)
  })

  it('should return http error if something failed', async () => {
    const { sut, classUpdater, identifier, params } = makeSut()

    const error = new Error(faker.lorem.words())
    classUpdater.update.mockRejectedValue(error)

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
