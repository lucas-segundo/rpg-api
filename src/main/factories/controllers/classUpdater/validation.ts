import { Validation } from 'presentation/interfaces/Validation'
import { ValidationBuilder } from 'validation/builder'
import { ValidationComposite } from 'validation/composite'

export const makeClassUpdaterValidation = (): Validation => {
  const titleValidators = ValidationBuilder.field('title').required().build()
  const idValidators = ValidationBuilder.field('id').required().build()

  return ValidationComposite.compose([...titleValidators, ...idValidators])
}
