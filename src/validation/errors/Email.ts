import { ValidationError } from 'presentation/interfaces/Validation'

export class EmailValidationError implements ValidationError {
  message = 'Valor informado não é um email'
}
