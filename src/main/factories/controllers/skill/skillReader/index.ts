import { SkillReaderController } from 'presentation/controllers/skill/SkillReader'
import { makeSkillReader } from './useCase'
import { makeSkillReaderValidation } from './validation'

export const makeSkillReaderController = () => {
  const classCreater = makeSkillReader()
  const validation = makeSkillReaderValidation()

  return new SkillReaderController(classCreater, validation)
}
