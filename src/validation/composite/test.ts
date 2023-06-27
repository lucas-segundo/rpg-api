import { faker } from '@faker-js/faker'
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

  it('should not return errors if value is correct', () => {
    const field = faker.database.column()
    const validators = [new RequiredValidator(field), new EmailValidator(field)]

    const composite = ValidationComposite.compose(validators)

    const validationResult = composite.validate({
      field,
      value: faker.internet.email(),
    })

    expect(validationResult).toEqual([])
  })

  it('should return errors if value is incorrect', () => {
    const field = faker.database.column()
    const validators = [new RequiredValidator(field), new EmailValidator(field)]

    const composite = ValidationComposite.compose(validators)

    const validationResult = composite.validate({
      field,
      value: '',
    })

    const errors = validators.map((validator) => validator.error)
    expect(validationResult).toEqual(errors)
  })
})
