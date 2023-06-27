import { Class } from 'domain/models/Class'
import { ClassCreater, ClassCreaterParams } from 'domain/useCase/ClassCreater'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { Controller } from 'presentation/interfaces/Controller'
import { HttpResponse, HttpErrorResponse } from 'presentation/interfaces/Http'
import { Validation } from 'presentation/interfaces/Validation'

export class ClassCreaterController implements Controller {
  constructor(
    readonly classCreater: ClassCreater,
    readonly validation: Validation
  ) {}

  async handle(
    params: ClassCreaterParams
  ): Promise<HttpResponse<Class> | HttpErrorResponse> {
    this.validateFields(params)

    return this.create(params)
  }

  validateFields({ title }: ClassCreaterParams) {
    this.validation.validate({
      field: 'title',
      value: title,
    })
  }

  async create(params: ClassCreaterParams) {
    try {
      const classCreated = await this.classCreater.create(params)

      return {
        data: classCreated,
        statusCode: HttpStatusCode.OK,
      }
    } catch (error) {
      return {
        errors: [error],
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    }
  }
}
