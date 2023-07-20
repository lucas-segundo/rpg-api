import { Class } from 'domain/models/Class'
import { ClassCreaterParams } from 'domain/useCases/class/ClassCreater'

export interface ClassCreaterRepo {
  create(params: ClassCreaterParams): Promise<Class>
}
