import { ClassCreaterRepo } from 'app/interfaces/ClassCreaterRepo'
import { Class } from 'domain/models/Class'
import { mockClass } from 'domain/models/Class/mock'
import { ClassCreater, ClassCreaterParams } from 'domain/useCase/ClassCreater'

export class DbClassCreater implements ClassCreater {
  constructor(private readonly classCreaterRepo: ClassCreaterRepo) {}

  async create(params: ClassCreaterParams): Promise<Class> {
    await this.classCreaterRepo.create(params)

    return mockClass()
  }
}
