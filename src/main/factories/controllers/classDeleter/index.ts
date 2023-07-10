import { ClassDeleterController } from 'presentation/controllers/ClassDeleter'
import { makeClassDeleter } from './useCase'
import { makeClassDeleterValidation } from './validation'

export const makeClassDeleterController = () => {
  const classCreater = makeClassDeleter()
  const validation = makeClassDeleterValidation()

  return new ClassDeleterController(classCreater, validation)
}
