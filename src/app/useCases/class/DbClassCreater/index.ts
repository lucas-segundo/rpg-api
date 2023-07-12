import { ClassCreaterRepo } from 'app/interfaces/class/ClassCreaterRepo'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import {
  ClassCreater,
  ClassCreaterParams,
} from 'domain/useCases/Class/ClassCreater'
import { DbClassModelAdapter } from '../../../adapters/DbClassAdapter'

export class DbClassCreater
  extends DbClassModelAdapter
  implements ClassCreater
{
  constructor(private readonly classCreaterRepo: ClassCreaterRepo) {
    super()
  }

  async create(params: ClassCreaterParams): Promise<Class> {
    try {
      const classData = await this.classCreaterRepo.create(params)

      return this.adapt(classData)
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
