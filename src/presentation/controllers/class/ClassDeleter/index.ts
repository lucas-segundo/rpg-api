import { Class } from 'domain/models/Class'
import {
  ClassDeleter,
  ClassDeleterParams,
} from 'domain/useCases/class/ClassDeleter'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { Controller } from 'presentation/interfaces/Controller'
import { HttpResponse, HttpErrorResponse } from 'presentation/interfaces/Http'
import { Validation } from 'presentation/interfaces/Validation'

export class ClassDeleterController implements Controller {
  constructor(
    private readonly classDeleter: ClassDeleter,
    private readonly validation: Validation
  ) {}

  async handle(
    params: ClassDeleterParams
  ): Promise<HttpResponse<Class> | HttpErrorResponse> {
    const validationErrors = this.validate(params)

    if (validationErrors.length) {
      return {
        errors: validationErrors,
        statusCode: HttpStatusCode.BAD_REQUEST,
      }
    }

    return await this.delete(params)
  }

  private validate(params: ClassDeleterParams) {
    const errors = this.validation.validate([
      {
        field: 'id',
        value: params.id,
      },
    ])

    return errors
  }

  private async delete(params: ClassDeleterParams) {
    try {
      const data = await this.classDeleter.delete(params)

      return {
        data,
        statusCode: HttpStatusCode.OK,
      }
    } catch (error) {
      return {
        errors: [error.message],
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    }
  }
}
