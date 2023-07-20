import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { SkillUpdaterRepo } from 'app/interfaces/skill/SkillUpdaterRepo'
import { NotFoundError } from 'domain/errors/NotFound'
import { Skill } from 'domain/models/Skill'
import {
  SkillUpdaterIdentifier,
  SkillUpdaterParams,
} from 'domain/useCases/skill/SkillUpdater'

import prisma from 'infra/prisma'
import { PrismaSkillAdapter } from 'infra/prisma/adapters/SkillAdapter'

export class PrismaSkillUpdaterRepo
  extends PrismaSkillAdapter
  implements SkillUpdaterRepo
{
  async update(
    { id }: SkillUpdaterIdentifier,
    params: SkillUpdaterParams
  ): Promise<Skill> {
    try {
      const result = await prisma.skill.update({
        where: {
          id,
        },
        data: params,
      })

      return this.adapt(result)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundError('Skill')
      }

      throw error
    }
  }
}
