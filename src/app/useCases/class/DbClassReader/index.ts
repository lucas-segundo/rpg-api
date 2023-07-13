import { ClassReaderRepo } from 'app/interfaces/class/ClassReaderRepo'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import {
  ClassReader,
  ClassReaderParams,
} from 'domain/useCases/class/ClassReader'
import { DbClassModelAdapter } from '../../../adapters/DbClassAdapter'

export class DbClassReader extends DbClassModelAdapter implements ClassReader {
  constructor(private readonly ClassReaderRepo: ClassReaderRepo) {
    super()
  }

  async read(params: ClassReaderParams): Promise<Class | null> {
    try {
      const data = await this.ClassReaderRepo.read(params)

      return data && this.adapt(data)
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
