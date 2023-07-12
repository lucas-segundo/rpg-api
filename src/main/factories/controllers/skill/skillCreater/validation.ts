import { Validation } from 'presentation/interfaces/Validation'
import { ValidationBuilder } from 'validation/builder'
import { ValidationComposite } from 'validation/composite'

export const makeSkillCreaterValidation = (): Validation => {
  const validators = ValidationBuilder.field('title').required().build()

  return ValidationComposite.compose([...validators])
}
