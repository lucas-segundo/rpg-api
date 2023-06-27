import { faker } from '@faker-js/faker'
import { EmailValidationError } from 'validation/errors/email'
import { EmailValidator } from '.'

describe('EmailValidator', () => {
  it('should not return error if field is correct', () => {
    const field = faker.database.column()
    const value = faker.internet.email()

    const validator = new EmailValidator(field)

    expect(validator.validate(value)).toBeNull()
  })

  it('should return error if field is incorrect', () => {
    const field = faker.database.column()
    const value = faker.lorem.word()

    const validator = new EmailValidator(field)

    expect(validator.validate(value)).toBeInstanceOf(EmailValidationError)
  })
})
