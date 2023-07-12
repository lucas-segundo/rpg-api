import { DbClassReader } from 'app/useCases/class/DbClassReader'
import { ClassReader } from 'domain/useCases/class/ClassReader'
import { PrismaClassReaderRepo } from 'infra/prisma/repositories/class/ClassReader'

export const makeClassReader = (): ClassReader => {
  const repo = new PrismaClassReaderRepo()

  return new DbClassReader(repo)
}
