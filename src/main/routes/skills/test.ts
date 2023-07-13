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

describe('SkillsController', () => {
  let controller: SkillsController
  let skillCreaterController: SkillCreaterController
  let skillReaderController: SkillReaderController

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

      await controller.readOne(params.id.toString(), mockExpressResponse())

      expect(handleMocked).toBeCalledWith(params)
    })

    it('should response with right data', async () => {
      const handleMocked = jest.spyOn(skillReaderController, 'handle')
      const { okResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(okResponse)

      await controller.readOne(mockSkillReaderParams().id.toString(), res)

      expect(res.status).toBeCalledWith(okResponse.statusCode)
      expect(res.send).toBeCalledWith({ data: okResponse.data })
    })

    it('should response with right errors after it fails', async () => {
      const handleMocked = jest.spyOn(skillReaderController, 'handle')
      const { errorResponse, res } = makeMocks()

      handleMocked.mockResolvedValueOnce(errorResponse)

      await controller.readOne(mockSkillReaderParams().id.toString(), res)

      expect(res.status).toBeCalledWith(errorResponse.statusCode)
      expect(res.send).toBeCalledWith({ errors: errorResponse.errors })
    })
  })
})
