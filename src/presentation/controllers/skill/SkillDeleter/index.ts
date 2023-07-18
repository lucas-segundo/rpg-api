import { Skill } from 'domain/models/Skill'
import {
  SkillDeleter,
  SkillDeleterParams,
} from 'domain/useCases/skill/SkillDeleter'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { Controller } from 'presentation/interfaces/Controller'
import { HttpResponse, HttpErrorResponse } from 'presentation/interfaces/Http'
import { Validation } from 'presentation/interfaces/Validation'

export class SkillDeleterController implements Controller {
  constructor(
    private readonly skillDeleter: SkillDeleter,
    private readonly validation: Validation
  ) {}

  async handle(
    params: SkillDeleterParams
  ): Promise<HttpResponse<Skill> | HttpErrorResponse> {
    const validationErrors = this.validate(params)

    if (validationErrors.length) {
      return {
        errors: validationErrors,
        statusCode: HttpStatusCode.BAD_REQUEST,
      }
    }

    return await this.delete(params)
  }

  private validate(params: SkillDeleterParams) {
    const errors = this.validation.validate([
      {
        field: 'id',
        value: params.id,
      },
    ])

    return errors
  }

  private async delete(params: SkillDeleterParams) {
    try {
      const data = await this.skillDeleter.delete(params)

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
