import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { mockClass } from 'domain/models/Class/mock'
import { mockClassCreaterParams } from 'domain/useCases/ClassCreater/mock'
import { mockClassReaderParams } from 'domain/useCases/ClassReader/mock'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'
import { ClassReaderController } from 'presentation/controllers/ClassReader'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpErrorResponse, HttpResponse } from 'presentation/interfaces/Http'
import { mockExpressResponse } from '../utils/mockExpressResponse'
import { ClassController } from './class.controller'
import { makeClassModule } from './factory.module'

describe('ClassController', () => {
  let controller: ClassController
  let classCreaterController: ClassCreaterController
  let classReaderController: ClassReaderController

  const makeMocks = () => {
    const createdResponse: HttpResponse = {
      data: mockClass(),
      statusCode: HttpStatusCode.CREATED,
    }

    const okResponse: HttpResponse = {
      ...createdResponse,
      statusCode: HttpStatusCode.OK,
    }

    const errorResponse: HttpErrorResponse = {
      errors: [faker.lorem.words()],
      statusCode: faker.internet.httpStatusCode({
        types: ['serverError', 'clientError'],
      }),
    }

    const res = mockExpressResponse()

    return {
      createdResponse,
      okResponse,
      errorResponse,
      res,
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      makeClassModule()
    ).compile()

    controller = module.get(ClassController)
    classCreaterController = module.get(ClassCreaterController)
    classReaderController = module.get(ClassReaderController)
  })

  describe('.create', () => {
    it('should handle with right params', async () => {
      const params = mockClassCreaterParams()
      const handleMocked = jest.spyOn(classCreaterController, 'handle')

      await controller.create(params, mockExpressResponse())

      expect(handleMocked).toBeCalledWith(params)
    })

    it('should response with right data', async () => {
      const handleMocked = jest.spyOn(classCreaterController, 'handle')
      const { createdResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(createdResponse)

      await controller.create(mockClassCreaterParams(), res)

      expect(res.status).toBeCalledWith(createdResponse.statusCode)
      expect(res.send).toBeCalledWith({ data: createdResponse.data })
    })

    it('should response with right errors if it fails', async () => {
      const handleMocked = jest.spyOn(classCreaterController, 'handle')
      const { errorResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(errorResponse)

      await controller.create(mockClassCreaterParams(), res)

      expect(res.status).toBeCalledWith(errorResponse.statusCode)
      expect(res.send).toBeCalledWith({ errors: errorResponse.errors })
    })
  })

  describe('.read', () => {
    it('should call with right params', async () => {
      const params = mockClassReaderParams()
      const handleMocked = jest.spyOn(classReaderController, 'handle')

      await controller.readOne(params.id.toString(), mockExpressResponse())

      expect(handleMocked).toBeCalledWith(params)
    })

    it('should response with right data', async () => {
      const handleMocked = jest.spyOn(classReaderController, 'handle')
      const { okResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(okResponse)

      await controller.readOne(mockClassReaderParams().id.toString(), res)

      expect(res.status).toBeCalledWith(okResponse.statusCode)
      expect(res.send).toBeCalledWith({ data: okResponse.data })
    })

    it('should response with right errors after it fails', async () => {
      const handleMocked = jest.spyOn(classReaderController, 'handle')
      const { errorResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(errorResponse)

      await controller.readOne(mockClassReaderParams().id.toString(), res)

      expect(res.status).toBeCalledWith(errorResponse.statusCode)
      expect(res.send).toBeCalledWith({ errors: errorResponse.errors })
    })
  })
})
