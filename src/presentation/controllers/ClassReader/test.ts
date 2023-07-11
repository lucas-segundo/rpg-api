import { faker } from '@faker-js/faker'
import { mockClass } from 'domain/models/Class/mock'
import {
  mockClassReader,
  mockClassReaderParams,
} from 'domain/useCases/Class/ClassReader/mock'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpErrorResponse, HttpResponse } from 'presentation/interfaces/Http'
import {
  ValidationError,
  ValidationParams,
} from 'presentation/interfaces/Validation'
import { mockValidation } from 'presentation/interfaces/Validation/mock'
import { ClassReaderController } from '.'

const makeSut = () => {
  const classReader = mockClassReader()
  const validation = mockValidation()
  const sut = new ClassReaderController(classReader, validation)

  validation.validate.mockReturnValue([])

  return {
    classReader,
    sut,
    validation,
  }
}

describe('ClassReaderController', () => {
  it('should call class reader with right params', async () => {
    const { sut, classReader } = makeSut()

    const params = mockClassReaderParams()
    await sut.handle(params)

    expect(classReader.read).toBeCalledWith(params)
  })

  it('should return http response with data', async () => {
    const { sut, classReader } = makeSut()

    const classReaded = mockClass()
    classReader.read.mockResolvedValue(classReaded)

    const httpResponse: HttpResponse = {
      data: classReaded,
      statusCode: HttpStatusCode.OK,
    }

    const params = mockClassReaderParams()
    const result = await sut.handle(params)

    expect(result).toEqual(httpResponse)
  })

  it('should return http error if something failed', async () => {
    const { sut, classReader } = makeSut()

    const error = new Error(faker.lorem.words())
    classReader.read.mockRejectedValue(error)

    const httpErrorResponse: HttpErrorResponse = {
      errors: [error.message],
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    }

    const result = await sut.handle(mockClassReaderParams())

    expect(result).toEqual(httpErrorResponse)
  })

  it('should call validation with right params', async () => {
    const { sut, validation } = makeSut()
    const params = mockClassReaderParams()

    const validationParams: ValidationParams[] = [
      {
        field: 'id',
        value: params.id,
      },
    ]

    await sut.handle(params)

    expect(validation.validate).toBeCalledWith(validationParams)
  })

  it('should return http error if it has validations errors', async () => {
    const { sut, validation } = makeSut()

    const errors: ValidationError[] = [
      { field: faker.database.column(), errors: [faker.lorem.words()] },
    ]

    validation.validate.mockReturnValue(errors)

    const params = mockClassReaderParams()
    const result = await sut.handle(params)

    const httpErrorResponse: HttpErrorResponse = {
      errors,
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    expect(result).toEqual(httpErrorResponse)
  })
})
