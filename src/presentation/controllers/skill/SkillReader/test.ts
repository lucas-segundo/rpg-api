import { faker } from '@faker-js/faker'
import { mockSkill } from 'domain/models/Skill/mock'
import {
  mockSkillReader,
  mockSkillReaderParams,
} from 'domain/useCases/skill/SkillReader/mock'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpErrorResponse, HttpResponse } from 'presentation/interfaces/Http'
import {
  ValidationError,
  ValidationParams,
} from 'presentation/interfaces/Validation'
import { mockValidation } from 'presentation/interfaces/Validation/mock'
import { SkillReaderController } from '.'

const makeSut = () => {
  const skillReader = mockSkillReader()
  const validation = mockValidation()
  const sut = new SkillReaderController(skillReader, validation)

  validation.validate.mockReturnValue([])

  return {
    skillReader,
    sut,
    validation,
  }
}

describe('SkillReaderController', () => {
  it('should call skill reader with right params', async () => {
    const { sut, skillReader } = makeSut()

    const params = mockSkillReaderParams()
    await sut.handle(params)

    expect(skillReader.read).toBeCalledWith(params)
  })

  it('should return http response with data', async () => {
    const { sut, skillReader } = makeSut()

    const skillReaded = mockSkill()
    skillReader.read.mockResolvedValue(skillReaded)

    const httpResponse: HttpResponse = {
      data: skillReaded,
      statusCode: HttpStatusCode.OK,
    }

    const params = mockSkillReaderParams()
    const result = await sut.handle(params)

    expect(result).toEqual(httpResponse)
  })

  it('should return http error if something failed', async () => {
    const { sut, skillReader } = makeSut()

    const error = new Error(faker.lorem.words())
    skillReader.read.mockRejectedValue(error)

    const httpErrorResponse: HttpErrorResponse = {
      errors: [error.message],
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    }

    const result = await sut.handle(mockSkillReaderParams())

    expect(result).toEqual(httpErrorResponse)
  })

  it('should call validation with right params', async () => {
    const { sut, validation } = makeSut()
    const params = mockSkillReaderParams()

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

    const params = mockSkillReaderParams()
    const result = await sut.handle(params)

    const httpErrorResponse: HttpErrorResponse = {
      errors,
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    expect(result).toEqual(httpErrorResponse)
  })
})
