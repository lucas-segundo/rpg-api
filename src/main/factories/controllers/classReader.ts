import { ClassReaderController } from 'presentation/controllers/ClassReader'
import { makeClassReader } from '../useCases/classReader'
import { makeClassReaderValidation } from '../validation/classReader'

export const makeClassReaderController = () => {
  const classCreater = makeClassReader()
  const validation = makeClassReaderValidation()

  return new ClassReaderController(classCreater, validation)
}
