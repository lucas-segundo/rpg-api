import {
  Validation,
  ValidationError,
  ValidationParams,
} from 'presentation/interfaces/Validation'
import { Validator } from 'validation/interfaces/Validator'

export class ValidationComposite implements Validation {
  private constructor(readonly validators: Validator[]) {}

  static compose(validators: Validator[]) {
    return new ValidationComposite(validators)
  }

  validate({ field, value }: ValidationParams): ValidationError[] | [] {
    const fieldValidators = this.validators.filter(
      (validator) => validator.field === field
    )

    const validationResult = fieldValidators.map((validator) =>
      validator.validate(value)
    )

    const errors: ValidationError[] = []
    validationResult.forEach((result) => {
      if (result) {
        errors.push(result)
      }
    })

    return errors
  }
}
