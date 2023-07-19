import { faker } from '@faker-js/faker'
import { mockClass } from 'domain/models/Class/mock'
import {
  mockClassSkillAdder,
  mockClassSkillAdderParams,
} from 'domain/useCases/class/ClassSkillAdder/mock'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpErrorResponse, HttpResponse } from 'presentation/interfaces/Http'
import { ValidationParams } from 'presentation/interfaces/Validation'
import {
  mockValidation,
  mockValidationErrors,
} from 'presentation/interfaces/Validation/mock'
import { ClassSkillAdderController } from '.'

const makeSut = () => {
  const classSkillAdder = mockClassSkillAdder()
  const validation = mockValidation()
  const sut = new ClassSkillAdderController(classSkillAdder, validation)

  validation.validate.mockReturnValue([])

  return {
    sut,
    classSkillAdder,
    validation,
  }
}

describe('ClassSkillAdderController', () => {
  it('should call class addr with right params', async () => {
    const { sut, classSkillAdder } = makeSut()

    const params = mockClassSkillAdderParams()
    await sut.handle(params)

    expect(classSkillAdder.add).toBeCalledWith(params)
  })

  it('should return http response with data', async () => {
    const { sut, classSkillAdder } = makeSut()

    const classCreated = mockClass()
    classSkillAdder.add.mockResolvedValue(classCreated)

    const httpResponse: HttpResponse = {
      data: classCreated,
      statusCode: HttpStatusCode.OK,
    }

    const params = mockClassSkillAdderParams()
    const result = await sut.handle(params)

    expect(result).toEqual(httpResponse)
  })

  it('should return http error if something failed', async () => {
    const { sut, classSkillAdder } = makeSut()

    const error = new Error(faker.lorem.words())
    classSkillAdder.add.mockRejectedValue(error)

    const httpErrorResponse: HttpErrorResponse = {
      errors: [error.message],
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    }

    const result = await sut.handle(mockClassSkillAdderParams())

    expect(result).toEqual(httpErrorResponse)
  })

  it('should call validation with right params', async () => {
    const { sut, validation } = makeSut()
    const params = mockClassSkillAdderParams()

    const validationParams: ValidationParams[] = [
      {
        field: 'classId',
        value: params.classId,
      },
      {
        field: 'skillId',
        value: params.skillId,
      },
    ]

    await sut.handle(params)

    expect(validation.validate).toBeCalledWith(validationParams)
  })

  it('should return http error if it has validations errors', async () => {
    const { sut, validation } = makeSut()

    const errorMessages = mockValidationErrors()
    validation.validate.mockReturnValue(errorMessages)

    const params = mockClassSkillAdderParams()
    const result = await sut.handle(params)

    const httpErrorResponse: HttpErrorResponse = {
      errors: errorMessages,
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    expect(result).toEqual(httpErrorResponse)
  })
})
