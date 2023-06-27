import { ValidationError } from 'presentation/interfaces/Validation'
import { EmailValidationError } from 'validation/errors/email'
import { Validator } from 'validation/interfaces/Validator'

export class EmailValidator implements Validator {
  error = new EmailValidationError()

  constructor(readonly field: string) {}

  validate(value: string): ValidationError | null {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    const isEmailValid = emailRegex.test(value)
    return isEmailValid ? null : this.error
  }
}
