import { ClassSkillAdderController } from 'presentation/controllers/class/ClassSkillAdder'
import { makeClassSkillAdder } from './useCase'
import { makeClassSkillAdderValidation } from './validation'

export const makeClassSkillAdderController = () => {
  const classCreater = makeClassSkillAdder()
  const validation = makeClassSkillAdderValidation()

  return new ClassSkillAdderController(classCreater, validation)
}
