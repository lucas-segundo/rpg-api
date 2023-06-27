export class UnexpectedError extends Error {
  constructor() {
    super()
    this.message = 'Something wrong happened'
  }
}
