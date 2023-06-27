export class RequiredValidationError extends Error {
  constructor() {
    super()
    this.message = 'Campo obrigatório'
  }
}
