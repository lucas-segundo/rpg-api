export interface ValidationParams {
  field: string
  value: string | number | null | undefined
}

export interface ValidationError {
  field: string
  errors: string[]
}

export interface Validation {
  validate(params: ValidationParams[]): ValidationError[]
}
