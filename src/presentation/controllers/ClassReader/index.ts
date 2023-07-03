import { Class } from 'domain/models/Class'
import { ClassReader, ClassReaderParams } from 'domain/useCases/ClassReader'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { Controller } from 'presentation/interfaces/Controller'
import { HttpResponse, HttpErrorResponse } from 'presentation/interfaces/Http'
import { Validation } from 'presentation/interfaces/Validation'

export class ClassReaderController implements Controller {
  constructor(
    private readonly classReader: ClassReader,
    private readonly validation: Validation
  ) {}

  async handle(
    params: ClassReaderParams
  ): Promise<HttpResponse<Class | null> | HttpErrorResponse> {
    const errors = this.validation.validate({
      field: 'id',
      value: params.id,
    })

    if (errors.length) {
      return {
        errors,
        statusCode: HttpStatusCode.BAD_REQUEST,
      }
    }

    return await this.read(params)
  }

  private async read(params: ClassReaderParams) {
    try {
      const data = await this.classReader.read(params)

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
