import { DbClassDeleter } from 'app/useCases/class/DbClassDeleter'
import { ClassDeleter } from 'domain/useCases/Class/ClassDeleter'
import { PrismaClassDeleterRepo } from 'infra/prisma/repositories/class/ClassDeleter'

export const makeClassDeleter = (): ClassDeleter => {
  const repo = new PrismaClassDeleterRepo()

  return new DbClassDeleter(repo)
}
