import { ClassUpdaterRepo } from 'app/interfaces/ClassUpdaterRepo'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import { ClassUpdater, ClassUpdaterParams } from 'domain/useCases/ClassUpdater'

export class DbClassUpdater implements ClassUpdater {
  constructor(private readonly ClassUpdaterRepo: ClassUpdaterRepo) {}

  async update(params: ClassUpdaterParams): Promise<Class> {
    try {
      const classCreated = await this.ClassUpdaterRepo.update(params)

      return classCreated
    } catch (error) {
      console.error(error)
      throw new UnexpectedError()
    }
  }
}
