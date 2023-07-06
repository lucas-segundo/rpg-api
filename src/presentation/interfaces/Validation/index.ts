export interface ValidationParams {
  field: string
  value: string | number | null | undefined
}

export interface Validation {
  validate(params: ValidationParams): string[] | []
}
