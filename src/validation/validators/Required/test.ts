import { faker } from '@faker-js/faker'
import { RequiredValidationError } from 'validation/errors/Required'
import { RequiredValidator } from '.'

describe('RequiredValidator', () => {
  it('should not return error if field is correct', () => {
    const field = faker.database.column()
    const value = faker.lorem.word()

    const validator = new RequiredValidator(field)

    expect(validator.validate(value)).toBeNull()
  })

  it('should return error if field is incorrect', () => {
    const field = faker.database.column()
    const value = ''

    const validator = new RequiredValidator(field)

    expect(validator.validate(value)).toBe(
      new RequiredValidationError().message
    )
  })
})
