import { ClassCreaterRepo } from 'app/interfaces/ClassCreaterRepo'
import { Class } from 'domain/models/Class'
import { ClassCreater, ClassCreaterParams } from 'domain/useCase/ClassCreater'

export class DbClassCreater implements ClassCreater {
  constructor(private readonly classCreaterRepo: ClassCreaterRepo) {}

  async create(params: ClassCreaterParams): Promise<Class> {
    const classCreated = await this.classCreaterRepo.create(params)

    return classCreated
  }
}
