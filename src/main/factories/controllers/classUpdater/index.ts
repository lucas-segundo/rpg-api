import { ClassUpdaterController } from 'presentation/controllers/ClassUpdater'
import { makeClassUpdater } from './useCase'
import { makeClassUpdaterValidation } from './validation'

export const makeClassUpdaterController = () => {
  const classCreater = makeClassUpdater()
  const validation = makeClassUpdaterValidation()

  return new ClassUpdaterController(classCreater, validation)
}
