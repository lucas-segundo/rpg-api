export class EmailValidationError extends Error {
  constructor() {
    super()
    this.message = 'Valor informado não é um email'
  }
}
