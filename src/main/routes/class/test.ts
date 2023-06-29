import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { mockClass } from 'domain/models/Class/mock'
import { mockClassCreaterParams } from 'domain/useCases/ClassCreater/mock'
import { ClassCreaterController } from 'presentation/controllers/ClassCreater'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpErrorResponse, HttpResponse } from 'presentation/interfaces/Http'
import { mockExpressResponse } from '../utils/mockExpressResponse'
import { ClassController } from './class.controller'
import { CreateClassDto } from './dto/CreateClass'
import { makeClassModule } from './factory.module'

describe('ClassController', () => {
  let controller: ClassController
  let classCreaterController: ClassCreaterController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      makeClassModule()
    ).compile()

    controller = module.get<ClassController>(ClassController)
    classCreaterController = module.get<ClassCreaterController>(
      ClassCreaterController
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call create with right params', async () => {
    const dto: CreateClassDto = mockClassCreaterParams()
    const createMocked = jest.spyOn(classCreaterController, 'create')

    await controller.create(dto, mockExpressResponse())

    expect(createMocked).toBeCalledWith(dto)
  })

  it('should response with right data after creation', async () => {
    const createMocked = jest.spyOn(classCreaterController, 'create')
    const result: HttpResponse = {
      data: mockClass(),
      statusCode: HttpStatusCode.CREATED,
    }
    createMocked.mockResolvedValueOnce(result)

    const res = mockExpressResponse()
    const params = mockClassCreaterParams()
    await controller.create(params, res)

    expect(res.status).toBeCalledWith(result.statusCode)
    expect(res.send).toBeCalledWith({ data: result.data })
  })

  it('should response with right errors after creation fails', async () => {
    const createMocked = jest.spyOn(classCreaterController, 'create')
    const result: HttpErrorResponse = {
      errors: [faker.lorem.words()],
      statusCode: faker.internet.httpStatusCode({
        types: ['serverError', 'clientError'],
      }),
    }
    createMocked.mockResolvedValueOnce(result)

    const res = mockExpressResponse()
    const params = mockClassCreaterParams()
    await controller.create(params, res)

    expect(res.status).toBeCalledWith(result.statusCode)
    expect(res.send).toBeCalledWith({ errors: result.errors })
  })
})
