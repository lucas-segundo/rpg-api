export interface ValidationParams {
  field: string
  value: string | number
}

export interface Validation {
  validate(params: ValidationParams): string[] | []
}
