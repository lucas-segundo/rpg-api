import { Class } from 'domain/models/Class'
import { ClassReaderParams } from 'domain/useCases/class/ClassReader'

export interface ClassReaderRepo {
  read(params: ClassReaderParams): Promise<Class | null>
}
