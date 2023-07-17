import { Skill } from 'domain/models/Skill'
import {
  SkillUpdater,
  SkillUpdaterIdentifier,
  SkillUpdaterParams,
} from 'domain/useCases/skill/SkillUpdater'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { Controller } from 'presentation/interfaces/Controller'
import { HttpResponse, HttpErrorResponse } from 'presentation/interfaces/Http'
import { Validation } from 'presentation/interfaces/Validation'

export interface SkillUpdaterControllerParams {
  identifier: SkillUpdaterIdentifier
  params: SkillUpdaterParams
}

export class SkillUpdaterController implements Controller {
  constructor(
    private readonly skillUpdater: SkillUpdater,
    private readonly validation: Validation
  ) {}

  async handle({
    identifier,
    params,
  }: SkillUpdaterControllerParams): Promise<
    HttpResponse<Skill> | HttpErrorResponse
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

  private validate({ identifier, params }: SkillUpdaterControllerParams) {
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

  private async update({ identifier, params }: SkillUpdaterControllerParams) {
    try {
      const data = await this.skillUpdater.update(identifier, params)

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
