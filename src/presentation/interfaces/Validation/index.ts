export interface ValidationParams {
  field: string
  value: string
}

export interface Validation {
  validate(params: ValidationParams): string[] | []
}
