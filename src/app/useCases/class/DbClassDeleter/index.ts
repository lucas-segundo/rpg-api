import { ClassDeleterRepo } from 'app/interfaces/class/ClassDeleterRepo'
import { NotFoundError } from 'domain/errors/NotFound'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import {
  ClassDeleter,
  ClassDeleterParams,
} from 'domain/useCases/class/ClassDeleter'

export class DbClassDeleter implements ClassDeleter {
  constructor(private readonly ClassDeleterRepo: ClassDeleterRepo) {}

  async delete(params: ClassDeleterParams): Promise<Class> {
    try {
      const data = await this.ClassDeleterRepo.delete(params)

      return data
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      throw new UnexpectedError()
    }
  }
}
