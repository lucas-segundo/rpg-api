import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { mockClass } from 'domain/models/Class/mock'
import { mockClassCreaterParams } from 'domain/useCases/class/ClassCreater/mock'
import { mockClassDeleterParams } from 'domain/useCases/class/ClassDeleter/mock'
import { mockClassReaderParams } from 'domain/useCases/class/ClassReader/mock'
import { mockClassUpdaterParams } from 'domain/useCases/class/ClassUpdater/mock'
import { ClassCreaterController } from 'presentation/controllers/class/ClassCreater'
import { ClassDeleterController } from 'presentation/controllers/class/ClassDeleter'
import { ClassReaderController } from 'presentation/controllers/class/ClassReader'
import {
  ClassUpdaterController,
  ClassUpdaterControllerParams,
} from 'presentation/controllers/class/ClassUpdater'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpErrorResponse, HttpResponse } from 'presentation/interfaces/Http'
import { mockExpressResponse } from '../utils/mockExpressResponse'
import { ClassesController } from './classes.controller'
import { makeClassesModule } from './factory.module'

describe('ClassesController', () => {
  let controller: ClassesController
  let classCreaterController: ClassCreaterController
  let classReaderController: ClassReaderController
  let classUpdaterController: ClassUpdaterController
  let classDeleterController: ClassDeleterController

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
      makeClassesModule()
    ).compile()

    controller = module.get(ClassesController)
    classCreaterController = module.get(ClassCreaterController)
    classReaderController = module.get(ClassReaderController)
    classUpdaterController = module.get(ClassUpdaterController)
    classDeleterController = module.get(ClassDeleterController)
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

      await controller.read(params.id.toString(), mockExpressResponse())

      expect(handleMocked).toBeCalledWith(params)
    })

    it('should response with right data', async () => {
      const handleMocked = jest.spyOn(classReaderController, 'handle')
      const { okResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(okResponse)

      await controller.read(mockClassReaderParams().id.toString(), res)

      expect(res.status).toBeCalledWith(okResponse.statusCode)
      expect(res.send).toBeCalledWith({ data: okResponse.data })
    })

    it('should response with right errors after it fails', async () => {
      const handleMocked = jest.spyOn(classReaderController, 'handle')
      const { errorResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(errorResponse)

      await controller.read(mockClassReaderParams().id.toString(), res)

      expect(res.status).toBeCalledWith(errorResponse.statusCode)
      expect(res.send).toBeCalledWith({ errors: errorResponse.errors })
    })
  })

  describe('.update', () => {
    it('should call with right params', async () => {
      const identifier = faker.number.int()
      const params = mockClassUpdaterParams()
      const handleMocked = jest.spyOn(classUpdaterController, 'handle')

      await controller.update(
        identifier.toString(),
        params,
        mockExpressResponse()
      )

      const expectedParams: ClassUpdaterControllerParams = {
        identifier: {
          id: identifier,
        },
        params,
      }

      expect(handleMocked).toBeCalledWith(expectedParams)
    })

    it('should response with right data', async () => {
      const identifier = faker.number.int()
      const params = mockClassUpdaterParams()
      const handleMocked = jest.spyOn(classUpdaterController, 'handle')

      const { okResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(okResponse)

      await controller.update(identifier.toString(), params, res)

      expect(res.status).toBeCalledWith(okResponse.statusCode)
      expect(res.send).toBeCalledWith({ data: okResponse.data })
    })

    it('should response with right errors after it fails', async () => {
      const identifier = faker.number.int()
      const params = mockClassUpdaterParams()
      const handleMocked = jest.spyOn(classUpdaterController, 'handle')

      const { errorResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(errorResponse)

      await controller.update(identifier.toString(), params, res)

      expect(res.status).toBeCalledWith(errorResponse.statusCode)
      expect(res.send).toBeCalledWith({ errors: errorResponse.errors })
    })
  })

  describe('.delete', () => {
    it('should call with right params', async () => {
      const params = mockClassDeleterParams()
      const handleMocked = jest.spyOn(classDeleterController, 'handle')

      await controller.delete(params.id.toString(), mockExpressResponse())

      expect(handleMocked).toBeCalledWith(params)
    })

    it('should response with right data', async () => {
      const handleMocked = jest.spyOn(classDeleterController, 'handle')
      const { okResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(okResponse)

      await controller.delete(mockClassDeleterParams().id.toString(), res)

      expect(res.status).toBeCalledWith(okResponse.statusCode)
      expect(res.send).toBeCalledWith({ data: okResponse.data })
    })

    it('should response with right errors after it fails', async () => {
      const handleMocked = jest.spyOn(classDeleterController, 'handle')
      const { errorResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(errorResponse)

      await controller.delete(mockClassDeleterParams().id.toString(), res)

      expect(res.status).toBeCalledWith(errorResponse.statusCode)
      expect(res.send).toBeCalledWith({ errors: errorResponse.errors })
    })
  })
})
