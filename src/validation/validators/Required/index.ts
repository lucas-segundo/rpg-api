import { RequiredValidationError } from 'validation/errors/Required'
import { Validator } from 'validation/interfaces/Validator'

export class RequiredValidator implements Validator {
  error = new RequiredValidationError()

  constructor(readonly field: string) {}

  validate(value: string | number): string | null {
    return value ? null : this.error.message
  }
}
