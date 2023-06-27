import { ValidationError } from 'presentation/interfaces/Validation'

export class RequiredValidationError implements ValidationError {
  message = 'Campo obrigatório'
}
