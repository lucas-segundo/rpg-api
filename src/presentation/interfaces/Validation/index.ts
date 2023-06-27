export interface ValidationError {
  message: string
}

export interface ValidationParams {
  field: string
  value: string
}

export interface Validation {
  validate(params: ValidationParams): ValidationError[] | []
}
