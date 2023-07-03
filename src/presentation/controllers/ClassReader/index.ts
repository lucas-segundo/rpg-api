import { Class } from 'domain/models/Class'
import { ClassReader, ClassReaderParams } from 'domain/useCases/ClassReader'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { Controller } from 'presentation/interfaces/Controller'
import { HttpResponse, HttpErrorResponse } from 'presentation/interfaces/Http'

export class ClassReaderController implements Controller {
  constructor(private readonly classReader: ClassReader) {}

  async handle(
    params: ClassReaderParams
  ): Promise<HttpResponse<Class | null> | HttpErrorResponse> {
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
