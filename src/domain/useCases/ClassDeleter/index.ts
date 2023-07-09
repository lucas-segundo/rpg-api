import { Class } from 'domain/models/Class'

export interface ClassDeleterParams {
  id: number
}

export interface ClassDeleter {
  delete(params: ClassDeleterParams): Promise<Class>
}
