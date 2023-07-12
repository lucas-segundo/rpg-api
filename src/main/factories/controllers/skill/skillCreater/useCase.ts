import { DbSkillCreater } from 'app/useCases/skill/DbSkillCreater'
import { SkillCreater } from 'domain/useCases/skill/SkillCreater'
import { PrismaSkillCreaterRepo } from 'infra/prisma/repositories/skill/SkillCreater'

export const makeSkillCreater = (): SkillCreater => {
  const repo = new PrismaSkillCreaterRepo()

  return new DbSkillCreater(repo)
}
