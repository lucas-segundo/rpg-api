import { mockClass } from 'domain/models/Class/mock'
import {
  mockClassReader,
  mockClassReaderParams,
} from 'domain/useCases/ClassReader/mock'
import { HttpStatusCode } from 'presentation/enum/HttpStatusCode'
import { HttpResponse } from 'presentation/interfaces/Http'
import { ClassReaderController } from '.'

const makeSut = () => {
  const classReader = mockClassReader()
  const sut = new ClassReaderController(classReader)

  return {
    classReader,
    sut,
  }
}

describe('ClassReaderController', () => {
  it('should call class reader with right params', async () => {
    const classReader = mockClassReader()
    const sut = new ClassReaderController(classReader)

    const params = mockClassReaderParams()
    await sut.handle(params)

    expect(classReader.read).toBeCalledWith(params)
  })

  it('should return http response with data', async () => {
    const { sut, classReader } = makeSut()

    const classReaded = mockClass()
    classReader.read.mockResolvedValue(classReaded)

    const httpResponse: HttpResponse = {
      data: classReaded,
      statusCode: HttpStatusCode.OK,
    }

    const params = mockClassReaderParams()
    const result = await sut.handle(params)

    expect(result).toEqual(httpResponse)
  })
})
