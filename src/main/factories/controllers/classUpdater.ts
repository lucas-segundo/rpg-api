import { ClassUpdaterController } from 'presentation/controllers/ClassUpdater'
import { makeClassUpdater } from '../useCases/classUpdater'
import { makeClassUpdaterValidation } from '../validation/classUpdater'

export const makeClassUpdaterController = () => {
  const classCreater = makeClassUpdater()
  const validation = makeClassUpdaterValidation()

  return new ClassUpdaterController(classCreater, validation)
}
