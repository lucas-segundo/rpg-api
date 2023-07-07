import { ClassCreaterRepo } from 'app/interfaces/ClassCreaterRepo'
import { ClassRepo } from 'app/models/ClassRepo'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import { ClassCreater, ClassCreaterParams } from 'domain/useCases/ClassCreater'

export class DbClassCreater implements ClassCreater {
  constructor(private readonly classCreaterRepo: ClassCreaterRepo) {}

  async create(params: ClassCreaterParams): Promise<Class> {
    try {
      const classCreated = await this.classCreaterRepo.create(params)

      return this.adaptToModel(classCreated)
    } catch (error) {
      throw new UnexpectedError()
    }
  }

  private adaptToModel({ id, title }: ClassRepo): Class {
    return {
      id,
      title,
    }
  }
}
