import { ClassReaderRepo } from 'app/interfaces/ClassReaderRepo'
import { UnexpectedError } from 'domain/errors/UnexpectedError'
import { Class } from 'domain/models/Class'
import { ClassReader, ClassReaderParams } from 'domain/useCases/ClassReader'

export class DbClassReader implements ClassReader {
  constructor(private readonly ClassReaderRepo: ClassReaderRepo) {}

  async read(params: ClassReaderParams): Promise<Class | null> {
    try {
      const classCreated = await this.ClassReaderRepo.read(params)

      return classCreated
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
