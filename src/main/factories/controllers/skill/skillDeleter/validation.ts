import { Validation } from 'presentation/interfaces/Validation'
import { ValidationBuilder } from 'validation/builder'
import { ValidationComposite } from 'validation/composite'

export const makeSkillDeleterValidation = (): Validation => {
  const idValidators = ValidationBuilder.field('id').required().build()

  return ValidationComposite.compose([...idValidators])
}
