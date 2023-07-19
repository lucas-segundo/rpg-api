import { Class } from 'domain/models/Class'
import {
  ClassSkillAdder,
  ClassSkillAdderParams,
} from 'domain/useCases/class/ClassSkillAdder'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { Controller } from 'presentation/interfaces/Controller'
import { HttpResponse, HttpErrorResponse } from 'presentation/interfaces/Http'
import { Validation } from 'presentation/interfaces/Validation'

export class ClassSkillAdderController implements Controller {
  constructor(
    private readonly classSkillAdder: ClassSkillAdder,
    private readonly validation: Validation
  ) {}

  async handle(
    params: ClassSkillAdderParams
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

  private validateFields({ classId, skillId }: ClassSkillAdderParams) {
    return this.validation.validate([
      {
        field: 'classId',
        value: classId,
      },
      {
        field: 'skillId',
        value: skillId,
      },
    ])
  }

  private async create(params: ClassSkillAdderParams) {
    try {
      const classCreated = await this.classSkillAdder.add(params)

      return {
        data: classCreated,
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
