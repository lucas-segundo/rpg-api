import { ClassDeleterController } from 'presentation/controllers/class/ClassDeleter'
import { makeClassDeleter } from './useCase'
import { makeClassDeleterValidation } from './validation'

export const makeClassDeleterController = () => {
  const classCreater = makeClassDeleter()
  const validation = makeClassDeleterValidation()

  return new ClassDeleterController(classCreater, validation)
}
