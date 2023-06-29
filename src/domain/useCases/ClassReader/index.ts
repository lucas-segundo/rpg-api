import { Class } from 'domain/models/Class'

export interface ClassReaderParams {
  id: string
}

export interface ClassReader {
  read(params: ClassReader): Promise<Class>
}
