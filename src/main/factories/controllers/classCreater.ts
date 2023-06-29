import { ClassCreaterController } from 'presentation/controllers/ClassCreater'
import { makeClassCreater } from '../useCases/classCreater'
import { makeClassCreaterValidation } from '../validation/classCreater'

export const makeClassCreaterController = () => {
  const classCreater = makeClassCreater()
  const validation = makeClassCreaterValidation()

  return new ClassCreaterController(classCreater, validation)
}
