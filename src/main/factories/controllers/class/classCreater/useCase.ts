import { DbClassCreater } from 'app/useCases/class/DbClassCreater'
import { ClassCreater } from 'domain/useCases/class/ClassCreater'
import { PrismaClassCreaterRepo } from 'infra/prisma/repositories/class/ClassCreater'

export const makeClassCreater = (): ClassCreater => {
  const repo = new PrismaClassCreaterRepo()

  return new DbClassCreater(repo)
}
