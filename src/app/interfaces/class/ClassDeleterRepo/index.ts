import { Class } from 'domain/models/Class'
import { ClassDeleterParams } from 'domain/useCases/class/ClassDeleter'

export interface ClassDeleterRepo {
  delete(params: ClassDeleterParams): Promise<Class>
}
