import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { mockSkill } from 'domain/models/Skill/mock'
import { mockSkillCreaterParams } from 'domain/useCases/skill/SkillCreater/mock'
import { SkillCreaterController } from 'presentation/controllers/skill/SkillCreater'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpErrorResponse, HttpResponse } from 'presentation/interfaces/Http'
import { mockExpressResponse } from '../utils/mockExpressResponse'
import { SkillsController } from './skills.controller'
import { makeSkillsModule } from './factory.module'
import { mockSkillReaderParams } from 'domain/useCases/skill/SkillReader/mock'
import { SkillReaderController } from 'presentation/controllers/skill/SkillReader'
import {
  SkillUpdaterController,
  SkillUpdaterControllerParams,
} from 'presentation/controllers/skill/SkillUpdater'
import { mockSkillUpdaterParams } from 'domain/useCases/skill/SkillUpdater/mock'
import { mockSkillDeleterParams } from 'domain/useCases/skill/SkillDeleter/mock'
import { SkillDeleterController } from 'presentation/controllers/skill/SkillDeleter'

describe('SkillsController', () => {
  let controller: SkillsController
  let skillCreaterController: SkillCreaterController
  let skillReaderController: SkillReaderController
  let skillUpdaterController: SkillUpdaterController
  let skillDeleterController: SkillDeleterController

  const makeMocks = () => {
    const createdResponse: HttpResponse = {
      data: mockSkill(),
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
      makeSkillsModule()
    ).compile()

    controller = module.get(SkillsController)
    skillCreaterController = module.get(SkillCreaterController)
    skillReaderController = module.get(SkillReaderController)
    skillUpdaterController = module.get(SkillUpdaterController)
    skillDeleterController = module.get(SkillDeleterController)
  })

  describe('.create', () => {
    it('should handle with right params', async () => {
      const params = mockSkillCreaterParams()
      const handleMocked = jest.spyOn(skillCreaterController, 'handle')

      await controller.create(params, mockExpressResponse())

      expect(handleMocked).toBeCalledWith(params)
    })

    it('should response with right data', async () => {
      const handleMocked = jest.spyOn(skillCreaterController, 'handle')
      const { createdResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(createdResponse)

      await controller.create(mockSkillCreaterParams(), res)

      expect(res.status).toBeCalledWith(createdResponse.statusCode)
      expect(res.send).toBeCalledWith({ data: createdResponse.data })
    })

    it('should response with right errors if it fails', async () => {
      const handleMocked = jest.spyOn(skillCreaterController, 'handle')
      const { errorResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(errorResponse)

      await controller.create(mockSkillCreaterParams(), res)

      expect(res.status).toBeCalledWith(errorResponse.statusCode)
      expect(res.send).toBeCalledWith({ errors: errorResponse.errors })
    })
  })

  describe('.read', () => {
    it('should call with right params', async () => {
      const params = mockSkillReaderParams()
      const handleMocked = jest.spyOn(skillReaderController, 'handle')

      await controller.read(params.id.toString(), mockExpressResponse())

      expect(handleMocked).toBeCalledWith(params)
    })

    it('should response with right data', async () => {
      const handleMocked = jest.spyOn(skillReaderController, 'handle')
      const { okResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(okResponse)

      await controller.read(mockSkillReaderParams().id.toString(), res)

      expect(res.status).toBeCalledWith(okResponse.statusCode)
      expect(res.send).toBeCalledWith({ data: okResponse.data })
    })

    it('should response with right errors after it fails', async () => {
      const handleMocked = jest.spyOn(skillReaderController, 'handle')
      const { errorResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(errorResponse)

      await controller.read(mockSkillReaderParams().id.toString(), res)

      expect(res.status).toBeCalledWith(errorResponse.statusCode)
      expect(res.send).toBeCalledWith({ errors: errorResponse.errors })
    })
  })

  describe('.update', () => {
    it('should call with right params', async () => {
      const identifier = faker.number.int()
      const params = mockSkillUpdaterParams()
      const handleMocked = jest.spyOn(skillUpdaterController, 'handle')

      await controller.update(
        identifier.toString(),
        params,
        mockExpressResponse()
      )

      const expectedParams: SkillUpdaterControllerParams = {
        identifier: {
          id: identifier,
        },
        params,
      }

      expect(handleMocked).toBeCalledWith(expectedParams)
    })

    it('should response with right data', async () => {
      const identifier = faker.number.int()
      const params = mockSkillUpdaterParams()
      const handleMocked = jest.spyOn(skillUpdaterController, 'handle')

      const { okResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(okResponse)

      await controller.update(identifier.toString(), params, res)

      expect(res.status).toBeCalledWith(okResponse.statusCode)
      expect(res.send).toBeCalledWith({ data: okResponse.data })
    })

    it('should response with right errors after it fails', async () => {
      const identifier = faker.number.int()
      const params = mockSkillUpdaterParams()
      const handleMocked = jest.spyOn(skillUpdaterController, 'handle')

      const { errorResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(errorResponse)

      await controller.update(identifier.toString(), params, res)

      expect(res.status).toBeCalledWith(errorResponse.statusCode)
      expect(res.send).toBeCalledWith({ errors: errorResponse.errors })
    })
  })

  describe('.delete', () => {
    it('should call with right params', async () => {
      const params = mockSkillDeleterParams()
      const handleMocked = jest.spyOn(skillDeleterController, 'handle')

      await controller.delete(params.id.toString(), mockExpressResponse())

      expect(handleMocked).toBeCalledWith(params)
    })

    it('should response with right data', async () => {
      const handleMocked = jest.spyOn(skillDeleterController, 'handle')
      const { okResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(okResponse)

      await controller.delete(mockSkillDeleterParams().id.toString(), res)

      expect(res.status).toBeCalledWith(okResponse.statusCode)
      expect(res.send).toBeCalledWith({ data: okResponse.data })
    })

    it('should response with right errors after it fails', async () => {
      const handleMocked = jest.spyOn(skillDeleterController, 'handle')
      const { errorResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(errorResponse)

      await controller.delete(mockSkillDeleterParams().id.toString(), res)

      expect(res.status).toBeCalledWith(errorResponse.statusCode)
      expect(res.send).toBeCalledWith({ errors: errorResponse.errors })
    })
  })
})
