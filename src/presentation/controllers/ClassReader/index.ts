import { Class } from 'domain/models/Class'
import { ClassReader, ClassReaderParams } from 'domain/useCases/ClassReader'
import { Controller } from 'presentation/interfaces/Controller'
import { HttpResponse, HttpErrorResponse } from 'presentation/interfaces/Http'
import { mockHttpResponse } from 'presentation/interfaces/Http/mock'

export class ClassReaderController implements Controller {
  constructor(private readonly classReader: ClassReader) {}

  async handle(
    params: ClassReaderParams
  ): Promise<HttpResponse<Class> | HttpErrorResponse> {
    await this.classReader.read(params)

    return mockHttpResponse()
  }
}
