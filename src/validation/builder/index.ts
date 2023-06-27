import { Validator } from 'validation/interfaces/Validator'
import { EmailValidator } from 'validation/validators/Email'
import { RequiredValidator } from 'validation/validators/Required'

export class ValidationBuilder {
  private constructor(
    readonly field: string,
    readonly validators: Validator[]
  ) {}

  static field(field: string) {
    return new ValidationBuilder(field, [])
  }

  email() {
    this.validators.push(new EmailValidator(this.field))
    return this
  }

  required() {
    this.validators.push(new RequiredValidator(this.field))
    return this
  }

  build() {
    return this.validators
  }
}
