import { ClassDeleterRepo } from 'app/interfaces/ClassDeleterRepo'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import { ClassDeleter, ClassDeleterParams } from 'domain/useCases/ClassDeleter'
import { DbClassModelAdapter } from '../../../adapters/DbClassAdapter'

export class DbClassDeleter
  extends DbClassModelAdapter
  implements ClassDeleter
{
  constructor(private readonly ClassDeleterRepo: ClassDeleterRepo) {
    super()
  }

  async delete(params: ClassDeleterParams): Promise<Class> {
    try {
      const classData = await this.ClassDeleterRepo.delete(params)

      return this.adapt(classData)
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      throw new UnexpectedError()
    }
  }
}
