import { HttpErrorResponse, HttpResponse } from '../Http'

export interface Controller {
  handle(params: any): Promise<HttpResponse | HttpErrorResponse>
}
