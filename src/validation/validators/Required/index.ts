import { ValidationError } from 'presentation/interfaces/Validation'
import { RequiredValidationError } from 'validation/errors/required'
import { Validator } from 'validation/interfaces/Validator'

export class RequiredValidator implements Validator {
  error = new RequiredValidationError()

  constructor(readonly field: string) {}

  validate(value: string): ValidationError | null {
    return value ? null : this.error
  }
}
