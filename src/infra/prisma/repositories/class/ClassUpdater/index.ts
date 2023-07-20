import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ClassUpdaterRepo } from 'app/interfaces/class/ClassUpdaterRepo'
import { NotFoundError } from 'domain/errors/NotFound'
import { Class } from 'domain/models/Class'
import {
  ClassUpdaterIdentifier,
  ClassUpdaterParams,
} from 'domain/useCases/class/ClassUpdater'

import prisma from 'infra/prisma'
import { PrismaClassAdapter } from 'infra/prisma/adapters/ClassAdapter'

export class PrismaClassUpdaterRepo
  extends PrismaClassAdapter
  implements ClassUpdaterRepo
{
  async update(
    { id }: ClassUpdaterIdentifier,
    params: ClassUpdaterParams
  ): Promise<Class> {
    try {
      const result = await prisma.class.update({
        where: {
          id,
        },
        data: params,
        include: { classesSkills: { include: { skill: true } } },
      })

      return this.adapt(result)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundError('Class')
      }

      throw error
    }
  }
}
