import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { SkillDeleterRepo } from 'app/interfaces/skill/SkillDeleterRepo'
import { NotFoundError } from 'domain/errors/NotFound'
import { Skill } from 'domain/models/Skill'
import { SkillDeleterParams } from 'domain/useCases/skill/SkillDeleter'

import prisma from 'infra/prisma'
import { PrismaSkillAdapter } from 'infra/prisma/adapters/SkillAdapter'

export class PrismaSkillDeleterRepo
  extends PrismaSkillAdapter
  implements SkillDeleterRepo
{
  async delete(params: SkillDeleterParams): Promise<Skill> {
    try {
      const result = await prisma.skill.delete({
        where: {
          id: params.id,
        },
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
