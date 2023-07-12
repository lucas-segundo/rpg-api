import { ClassUpdaterRepo } from 'app/interfaces/class/ClassUpdaterRepo'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import {
  ClassUpdater,
  ClassUpdaterIdentifier,
  ClassUpdaterParams,
} from 'domain/useCases/Class/ClassUpdater'
import { DbClassModelAdapter } from '../../../adapters/DbClassAdapter'

export class DbClassUpdater
  extends DbClassModelAdapter
  implements ClassUpdater
{
  constructor(private readonly ClassUpdaterRepo: ClassUpdaterRepo) {
    super()
  }

  async update(
    identifier: ClassUpdaterIdentifier,
    params: ClassUpdaterParams
  ): Promise<Class> {
    try {
      const classData = await this.ClassUpdaterRepo.update(identifier, params)

      return this.adapt(classData)
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      throw new UnexpectedError()
    }
  }
}
