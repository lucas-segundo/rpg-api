import { SkillCreaterRepo } from 'app/interfaces/skill/SkillCreaterRepo'
import { Skill } from 'domain/models/Skill'
import { SkillCreaterParams } from 'domain/useCases/skill/SkillCreater'

import prisma from 'infra/prisma'
import { PrismaSkillAdapter } from 'infra/prisma/adapters/SkillAdapter'

export class PrismaSkillCreaterRepo
  extends PrismaSkillAdapter
  implements SkillCreaterRepo
{
  async create({ title }: SkillCreaterParams): Promise<Skill> {
    const result = await prisma.skill.create({
      data: {
        title,
      },
    })

    return this.adapt(result)
  }
}
