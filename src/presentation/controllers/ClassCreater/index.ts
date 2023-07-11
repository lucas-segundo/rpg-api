import { Class } from 'domain/models/Class'
import { ClassCreater, ClassCreaterParams } from 'domain/useCases/ClassCreater'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { Controller } from 'presentation/interfaces/Controller'
import { HttpResponse, HttpErrorResponse } from 'presentation/interfaces/Http'
import { Validation } from 'presentation/interfaces/Validation'

export class ClassCreaterController implements Controller {
  constructor(
    private readonly classCreater: ClassCreater,
    private readonly validation: Validation
  ) {}

  async handle(
    params: ClassCreaterParams
  ): Promise<HttpResponse<Class> | HttpErrorResponse> {
    const errors = this.validateFields(params)

    if (errors.length) {
      return {
        errors,
        statusCode: HttpStatusCode.BAD_REQUEST,
      }
    }

    return await this.create(params)
  }

  private validateFields({ title }: ClassCreaterParams) {
    return this.validation.validate([
      {
        field: 'title',
        value: title,
      },
    ])
  }

  private async create(params: ClassCreaterParams) {
    try {
      const classCreated = await this.classCreater.create(params)

      return {
        data: classCreated,
        statusCode: HttpStatusCode.CREATED,
      }
    } catch (error) {
      return {
        errors: [error.message],
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    }
  }
}
