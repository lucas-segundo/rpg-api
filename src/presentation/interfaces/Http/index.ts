import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { ValidationError } from '../Validation'

export interface HttpResponse<Data = any> {
  data: Data
  statusCode: HttpStatusCode
}

export type HttpErrorResponse = {
  errors: string[] | ValidationError[]
  statusCode: HttpStatusCode
}
