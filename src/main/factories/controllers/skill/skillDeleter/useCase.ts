import { DbSkillDeleter } from 'app/useCases/skill/DbSkillDeleter'
import { SkillDeleter } from 'domain/useCases/skill/SkillDeleter'
import { PrismaSkillDeleterRepo } from 'infra/prisma/repositories/skill/SkillDeleter'

export const makeSkillDeleter = (): SkillDeleter => {
  const repo = new PrismaSkillDeleterRepo()

  return new DbSkillDeleter(repo)
}
