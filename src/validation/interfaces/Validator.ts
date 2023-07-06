export interface Validator {
  field: string

  validate(value: string | number | null | undefined): string | null
}
