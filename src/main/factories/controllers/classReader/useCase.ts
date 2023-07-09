import { DbClassReader } from 'app/useCases/class/DbClassReader'
import { ClassReader } from 'domain/useCases/ClassReader'
import { PrismaClassReaderRepo } from 'infra/prisma/repositories/ClassReader'

export const makeClassReader = (): ClassReader => {
  const repo = new PrismaClassReaderRepo()

  return new DbClassReader(repo)
}
