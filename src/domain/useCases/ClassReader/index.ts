import { Class } from 'domain/models/Class'

export interface ClassReaderParams {
  id: number
}

export interface ClassReader {
  read(params: ClassReader): Promise<Class>
}
