import { DbClassSkillAdder } from 'app/useCases/class/DbClassSkillAdder'
import { ClassSkillAdder } from 'domain/useCases/class/ClassSkillAdder'
import { PrismaClassSkillAdderRepo } from 'infra/prisma/repositories/class/ClassSkillAdder'

export const makeClassSkillAdder = (): ClassSkillAdder => {
  const repo = new PrismaClassSkillAdderRepo()

  return new DbClassSkillAdder(repo)
}
