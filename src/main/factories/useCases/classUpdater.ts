import { DbClassUpdater } from 'app/useCases/DbClassUpdater'
import { ClassUpdater } from 'domain/useCases/ClassUpdater'
import { PrismaClassUpdaterRepo } from 'infra/prisma/repositories/ClassUpdater'

export const makeClassUpdater = (): ClassUpdater => {
  const repo = new PrismaClassUpdaterRepo()

  return new DbClassUpdater(repo)
}
