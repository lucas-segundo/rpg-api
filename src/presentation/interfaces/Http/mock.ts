import { faker } from '@faker-js/faker'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpErrorResponse, HttpResponse } from '.'

export const mockHttpResponse = (): jest.Mocked<HttpResponse> => ({
  data: faker.database.column(),
  statusCode: HttpStatusCode.OK,
})

export const mockHttpErrorResponse = (): jest.Mocked<HttpErrorResponse> => ({
  errors: [faker.lorem.words(), faker.lorem.words()],
  statusCode: HttpStatusCode.OK,
})
