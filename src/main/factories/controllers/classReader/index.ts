import { ClassReaderController } from 'presentation/controllers/ClassReader'
import { makeClassReader } from './useCase'
import { makeClassReaderValidation } from './validation'

export const makeClassReaderController = () => {
  const classCreater = makeClassReader()
  const validation = makeClassReaderValidation()

  return new ClassReaderController(classCreater, validation)
}
