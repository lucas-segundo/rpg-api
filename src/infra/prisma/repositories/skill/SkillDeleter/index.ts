import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import {
  SkillDeleterRepo,
  SkillDeleterRepoParams,
} from 'app/interfaces/skill/SkillDeleterRepo'
import { SkillRepo } from 'app/models/SkillRepo'
import { NotFoundError } from 'domain/errors/NotFound'

import prisma from 'infra/prisma'

export class PrismaSkillDeleterRepo implements SkillDeleterRepo {
  async delete(params: SkillDeleterRepoParams): Promise<SkillRepo> {
    try {
      const result = await prisma.skill.delete({
        where: {
          id: params.id,
        },
      })

      return result
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundError('Skill')
      }

      throw error
    }
  }
}
