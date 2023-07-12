import { DbClassUpdater } from 'app/useCases/class/DbClassUpdater'
import { ClassUpdater } from 'domain/useCases/Class/ClassUpdater'
import { PrismaClassUpdaterRepo } from 'infra/prisma/repositories/class/ClassUpdater'

export const makeClassUpdater = (): ClassUpdater => {
  const repo = new PrismaClassUpdaterRepo()

  return new DbClassUpdater(repo)
}
