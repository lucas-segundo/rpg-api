import { DbSkillUpdater } from 'app/useCases/skill/DbSkillUpdater'
import { SkillUpdater } from 'domain/useCases/skill/SkillUpdater'
import { PrismaSkillUpdaterRepo } from 'infra/prisma/repositories/skill/SkillUpdater'

export const makeSkillUpdater = (): SkillUpdater => {
  const repo = new PrismaSkillUpdaterRepo()

  return new DbSkillUpdater(repo)
}
