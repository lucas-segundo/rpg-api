import { DbSkillReader } from 'app/useCases/skill/DbSkillReader'
import { SkillReader } from 'domain/useCases/skill/SkillReader'
import { PrismaSkillReaderRepo } from 'infra/prisma/repositories/skill/SkillReader'

export const makeSkillReader = (): SkillReader => {
  const repo = new PrismaSkillReaderRepo()

  return new DbSkillReader(repo)
}
