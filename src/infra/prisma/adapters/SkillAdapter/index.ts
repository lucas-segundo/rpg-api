import { Skill } from 'domain/models/Skill'
import { PrismaSkillResult } from 'infra/prisma/models/SkillResult'

export abstract class PrismaSkillAdapter {
  adapt({ id, title, deletedAt }: PrismaSkillResult): Skill {
    return {
      id,
      title,
      deletedAt,
    }
  }
}
