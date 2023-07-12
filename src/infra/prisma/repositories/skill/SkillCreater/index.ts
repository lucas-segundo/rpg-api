import {
  SkillCreaterRepo,
  SkillCreaterRepoParams,
} from 'app/interfaces/skill/SkillCreaterRepo'
import { SkillRepo } from 'app/models/SkillRepo'

import prisma from 'infra/prisma'

export class PrismaSkillCreaterRepo implements SkillCreaterRepo {
  async create({ title }: SkillCreaterRepoParams): Promise<SkillRepo> {
    const result = await prisma.skill.create({
      data: {
        title,
      },
    })

    return result
  }
}
