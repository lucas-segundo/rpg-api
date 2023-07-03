import {
  mockClassReader,
  mockClassReaderParams,
} from 'domain/useCases/ClassReader/mock'
import { ClassReaderController } from '.'

describe('ClassReaderController', () => {
  it('should call class reader with right params', async () => {
    const classReader = mockClassReader()
    const sut = new ClassReaderController(classReader)

    const params = mockClassReaderParams()
    await sut.handle(params)

    expect(classReader.read).toBeCalledWith(params)
  })
})
