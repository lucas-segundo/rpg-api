import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import {
  ClassUpdaterRepo,
  ClassUpdaterRepoParams,
  ClassUpdaterRepoIdentifier,
} from 'app/interfaces/class/ClassUpdaterRepo'
import { ClassRepo } from 'app/models/ClassRepo'
import { NotFoundError } from 'domain/errors/NotFound'

import prisma from 'infra/prisma'

export class PrismaClassUpdaterRepo implements ClassUpdaterRepo {
  async update(
    { id }: ClassUpdaterRepoIdentifier,
    params: ClassUpdaterRepoParams
  ): Promise<ClassRepo> {
    try {
      const result = await prisma.class.update({
        where: {
          id,
        },
        data: params,
      })

      return result
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundError('Class')
      }

      throw error
    }
  }
}
