import { faker } from '@faker-js/faker'
import { EmailValidator } from 'validation/validators/Email'
import { RequiredValidator } from 'validation/validators/Required'
import { ValidationBuilder } from '.'

describe('ValidationBuilder', () => {
  it('should get email validator', () => {
    const field = faker.database.column()

    const validators = ValidationBuilder.field(field).email().build()

    expect(validators[0]).toBeInstanceOf(EmailValidator)
  })

  it('should get field required validator', () => {
    const field = faker.database.column()

    const validators = ValidationBuilder.field(field).required().build()

    expect(validators[0]).toBeInstanceOf(RequiredValidator)
  })

  it('should get all validators', () => {
    const field = faker.database.column()

    const validators = ValidationBuilder.field(field).email().required().build()

    expect(validators[0]).toBeInstanceOf(EmailValidator)
    expect(validators[1]).toBeInstanceOf(RequiredValidator)
  })
})
