import { faker } from '@faker-js/faker'
import { mockClass } from 'domain/models/Class/mock'
import {
  mockClassCreater,
  mockClassCreaterParams,
} from 'domain/useCase/ClassCreater/mock'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpErrorResponse, HttpResponse } from 'presentation/interfaces/Http'
import { ClassCreaterController } from '.'

const makeSut = () => {
  const classCreater = mockClassCreater()
  const sut = new ClassCreaterController(classCreater)

  return {
    sut,
    classCreater,
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
      errors: [error],
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    }

    const result = await sut.handle(mockClassCreaterParams())

    expect(result).toEqual(httpErrorResponse)
  })
})
