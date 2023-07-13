import {
  SkillReaderRepo,
  SkillReaderRepoParams,
} from 'app/interfaces/skill/SkillReaderRepo'
import { SkillRepo } from 'app/models/SkillRepo'

import prisma from 'infra/prisma'

export class PrismaSkillReaderRepo implements SkillReaderRepo {
  async read({ id }: SkillReaderRepoParams): Promise<SkillRepo | null> {
    const result = await prisma.skill.findFirst({
      where: {
        id,
      },
    })

    return result
  }
}
