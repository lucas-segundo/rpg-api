import { ClassReaderRepo } from 'app/interfaces/class/ClassReaderRepo'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import {
  ClassReader,
  ClassReaderParams,
} from 'domain/useCases/class/ClassReader'

export class DbClassReader implements ClassReader {
  constructor(private readonly ClassReaderRepo: ClassReaderRepo) {}

  async read(params: ClassReaderParams): Promise<Class | null> {
    try {
      const data = await this.ClassReaderRepo.read(params)

      return data
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
