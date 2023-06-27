import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'

export interface HttpResponse<Data = any> {
  data: Data
  statusCode: HttpStatusCode
}

export type HttpErrorResponse = {
  errors: string[]
  statusCode: HttpStatusCode
}
