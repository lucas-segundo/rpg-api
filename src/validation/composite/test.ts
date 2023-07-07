import { faker } from '@faker-js/faker'
import { ValidationError } from 'presentation/interfaces/Validation'
import { EmailValidator } from 'validation/validators/Email'
import { RequiredValidator } from 'validation/validators/Required'
import { ValidationComposite } from '.'

describe('ValidationComposite', () => {
  it('should compose validators', () => {
    const field = faker.database.column()
    const validators = [new RequiredValidator(field), new EmailValidator(field)]

    const composite = ValidationComposite.compose(validators)

    expect(composite.validators).toEqual(validators)
  })

  it('should not return errors if values are correct', () => {
    const emailField = faker.database.column()
    const textField = faker.database.column()
    const validators = [
      new RequiredValidator(emailField),
      new EmailValidator(emailField),
      new RequiredValidator(textField),
    ]

    const composite = ValidationComposite.compose(validators)

    const validationResult = composite.validate([
      {
        field: emailField,
        value: faker.internet.email(),
      },
      {
        field: textField,
        value: faker.lorem.words(),
      },
    ])

    expect(validationResult).toEqual([])
  })

  it('should return errors if value is incorrect', () => {
    const field = faker.database.column()
    const validators = [new RequiredValidator(field), new EmailValidator(field)]

    const composite = ValidationComposite.compose(validators)

    const validationResult = composite.validate([
      {
        field,
        value: '',
      },
    ])

    const errors: ValidationError[] = [
      {
        field,
        errors: validators.map((validator) => validator.error.message),
      },
    ]
    expect(validationResult).toEqual(errors)
  })
})
