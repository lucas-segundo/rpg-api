import { SkillCreaterController } from 'presentation/controllers/skill/SkillCreater'
import { makeSkillCreater } from './useCase'
import { makeSkillCreaterValidation } from './validation'

export const makeSkillCreaterController = () => {
  const SkillCreater = makeSkillCreater()
  const validation = makeSkillCreaterValidation()

  return new SkillCreaterController(SkillCreater, validation)
}
