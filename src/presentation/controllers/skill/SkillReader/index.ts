import { Skill } from 'domain/models/Skill'
import {
  SkillReader,
  SkillReaderParams,
} from 'domain/useCases/skill/SkillReader'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { Controller } from 'presentation/interfaces/Controller'
import { HttpResponse, HttpErrorResponse } from 'presentation/interfaces/Http'
import { Validation } from 'presentation/interfaces/Validation'

export class SkillReaderController implements Controller {
  constructor(
    private readonly skillReader: SkillReader,
    private readonly validation: Validation
  ) {}

  async handle(
    params: SkillReaderParams
  ): Promise<HttpResponse<Skill | null> | HttpErrorResponse> {
    const errors = this.validation.validate([
      {
        field: 'id',
        value: params.id,
      },
    ])

    if (errors.length) {
      return {
        errors,
        statusCode: HttpStatusCode.BAD_REQUEST,
      }
    }

    return await this.read(params)
  }

  private async read(params: SkillReaderParams) {
    try {
      const data = await this.skillReader.read(params)

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
