import { Skill } from 'domain/models/Skill'
import {
  SkillCreater,
  SkillCreaterParams,
} from 'domain/useCases/skill/SkillCreater'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { Controller } from 'presentation/interfaces/Controller'
import { HttpResponse, HttpErrorResponse } from 'presentation/interfaces/Http'
import { Validation } from 'presentation/interfaces/Validation'

export class SkillCreaterController implements Controller {
  constructor(
    private readonly skillCreater: SkillCreater,
    private readonly validation: Validation
  ) {}

  async handle(
    params: SkillCreaterParams
  ): Promise<HttpResponse<Skill> | HttpErrorResponse> {
    const errors = this.validateFields(params)

    if (errors.length) {
      return {
        errors,
        statusCode: HttpStatusCode.BAD_REQUEST,
      }
    }

    return await this.create(params)
  }

  private validateFields({ title }: SkillCreaterParams) {
    return this.validation.validate([
      {
        field: 'title',
        value: title,
      },
    ])
  }

  private async create(params: SkillCreaterParams) {
    try {
      const skillCreated = await this.skillCreater.create(params)

      return {
        data: skillCreated,
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
