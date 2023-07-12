import { ClassCreaterController } from 'presentation/controllers/class/ClassCreater'
import { makeClassCreater } from './useCase'
import { makeClassCreaterValidation } from './validation'

export const makeClassCreaterController = () => {
  const classCreater = makeClassCreater()
  const validation = makeClassCreaterValidation()

  return new ClassCreaterController(classCreater, validation)
}
