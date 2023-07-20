import { ClassCreaterRepo } from 'app/interfaces/class/ClassCreaterRepo'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import {
  ClassCreater,
  ClassCreaterParams,
} from 'domain/useCases/class/ClassCreater'

export class DbClassCreater implements ClassCreater {
  constructor(private readonly classCreaterRepo: ClassCreaterRepo) {}

  async create(params: ClassCreaterParams): Promise<Class> {
    try {
      const data = await this.classCreaterRepo.create(params)

      return data
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
