import { SkillUpdaterController } from 'presentation/controllers/skill/SkillUpdater'
import { makeSkillUpdater } from './useCase'
import { makeSkillUpdaterValidation } from './validation'

export const makeSkillUpdaterController = () => {
  const classCreater = makeSkillUpdater()
  const validation = makeSkillUpdaterValidation()

  return new SkillUpdaterController(classCreater, validation)
}
