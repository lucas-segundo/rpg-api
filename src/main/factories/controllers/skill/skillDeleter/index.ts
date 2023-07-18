import { SkillDeleterController } from 'presentation/controllers/skill/SkillDeleter'
import { makeSkillDeleter } from './useCase'
import { makeSkillDeleterValidation } from './validation'

export const makeSkillDeleterController = () => {
  const classCreater = makeSkillDeleter()
  const validation = makeSkillDeleterValidation()

  return new SkillDeleterController(classCreater, validation)
}
