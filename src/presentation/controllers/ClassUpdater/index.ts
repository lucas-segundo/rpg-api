import { Class } from 'domain/models/Class'
import {
  ClassUpdater,
  ClassUpdaterIdentifier,
  ClassUpdaterParams,
} from 'domain/useCases/class/ClassUpdater'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { Controller } from 'presentation/interfaces/Controller'
import { HttpResponse, HttpErrorResponse } from 'presentation/interfaces/Http'
import { Validation } from 'presentation/interfaces/Validation'

export interface ClassUpdaterControllerParams {
  identifier: ClassUpdaterIdentifier
  params: ClassUpdaterParams
}

export class ClassUpdaterController implements Controller {
  constructor(
    private readonly classUpdater: ClassUpdater,
    private readonly validation: Validation
  ) {}

  async handle({
    identifier,
    params,
  }: ClassUpdaterControllerParams): Promise<
    HttpResponse<Class> | HttpErrorResponse
  > {
    const validationErrors = this.validate({ identifier, params })

    if (validationErrors.length) {
      return {
        errors: validationErrors,
        statusCode: HttpStatusCode.BAD_REQUEST,
      }
    }

    return await this.update({ identifier, params })
  }

  private validate({ identifier, params }: ClassUpdaterControllerParams) {
    const errors = this.validation.validate([
      {
        field: 'id',
        value: identifier.id,
      },
      {
        field: 'title',
        value: params.title,
      },
    ])

    return errors
  }

  private async update({ identifier, params }: ClassUpdaterControllerParams) {
    try {
      const data = await this.classUpdater.update(identifier, params)

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
