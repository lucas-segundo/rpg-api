import { ValidationError } from 'presentation/interfaces/Validation'

export interface Validator {
  field: string

  validate(value: string | number): ValidationError | null
}
