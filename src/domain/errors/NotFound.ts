export class NotFoundError extends Error {
  constructor(resource: string) {
    super()
    this.message = `${resource} could not be found`
  }
}
