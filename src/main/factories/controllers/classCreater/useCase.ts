import { DbClassCreater } from 'app/useCases/class/DbClassCreater'
import { ClassCreater } from 'domain/useCases/ClassCreater'
import { PrismaClassCreaterRepo } from 'infra/prisma/repositories/ClassCreater'

export const makeClassCreater = (): ClassCreater => {
  const repo = new PrismaClassCreaterRepo()

  return new DbClassCreater(repo)
}
