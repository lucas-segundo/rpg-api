import { ClassUpdaterRepo } from 'app/interfaces/ClassUpdaterRepo'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import {
  ClassUpdater,
  ClassUpdaterIdentifier,
  ClassUpdaterParams,
} from 'domain/useCases/ClassUpdater'

export class DbClassUpdater implements ClassUpdater {
  constructor(private readonly ClassUpdaterRepo: ClassUpdaterRepo) {}

  async update(
    identifier: ClassUpdaterIdentifier,
    params: ClassUpdaterParams
  ): Promise<Class> {
    try {
      const classCreated = await this.ClassUpdaterRepo.update(
        identifier,
        params
      )

      return classCreated
    } catch (error) {
      console.error(error)

      if (error instanceof NotFoundError) {
        throw error
      }

      throw new UnexpectedError()
    }
  }
}