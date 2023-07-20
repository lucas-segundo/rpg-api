import { SkillReaderRepo } from 'app/interfaces/skill/SkillReaderRepo'
import { Skill } from 'domain/models/Skill'
import { SkillReaderParams } from 'domain/useCases/skill/SkillReader'

import prisma from 'infra/prisma'

export class PrismaSkillReaderRepo implements SkillReaderRepo {
  async read({ id }: SkillReaderParams): Promise<Skill | null> {
    const result = await prisma.skill.findFirst({
      where: {
        id,
      },
    })

    return result
  }
}
