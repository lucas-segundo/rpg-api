export interface Validator {
  field: string

  validate(value: string | number): string | null
}
