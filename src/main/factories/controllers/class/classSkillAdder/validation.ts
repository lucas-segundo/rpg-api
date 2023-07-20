import { Validation } from 'presentation/interfaces/Validation'
import { ValidationBuilder } from 'validation/builder'
import { ValidationComposite } from 'validation/composite'

export const makeClassSkillAdderValidation = (): Validation => {
  return ValidationComposite.compose([
    ...ValidationBuilder.field('classId').required().build(),
    ...ValidationBuilder.field('skillId').required().build(),
  ])
}
