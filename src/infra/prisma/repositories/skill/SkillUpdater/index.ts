import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import {
  SkillUpdaterRepo,
  SkillUpdaterRepoParams,
  SkillUpdaterRepoIdentifier,
} from 'app/interfaces/skill/SkillUpdaterRepo'
import { SkillRepo } from 'app/models/SkillRepo'
import { NotFoundError } from 'domain/errors/NotFound'

import prisma from 'infra/prisma'

export class PrismaSkillUpdaterRepo implements SkillUpdaterRepo {
  async update(
    { id }: SkillUpdaterRepoIdentifier,
    params: SkillUpdaterRepoParams
  ): Promise<SkillRepo> {
    try {
      const result = await prisma.skill.update({
        where: {
          id,
        },
        data: params,
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
