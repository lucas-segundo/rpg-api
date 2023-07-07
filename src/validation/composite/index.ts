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

  validate(params: ValidationParams[]): ValidationError[] {
    const allErrors: ValidationError[] = []

    params.forEach((param) => {
      const errors = this.validateField(param)

      if (errors.length) {
        allErrors.push({
          field: param.field,
          errors,
        })
      }
    })

    return allErrors
  }

  private validateField({ field, value }: ValidationParams) {
    const fieldValidators = this.validators.filter(
      (validator) => validator.field === field
    )

    const validationResult = fieldValidators.map((validator) =>
      validator.validate(value)
    )

    const errors: string[] = []
    validationResult.forEach((result) => {
      if (result) {
        errors.push(result)
      }
    })

    return errors
  }
}
