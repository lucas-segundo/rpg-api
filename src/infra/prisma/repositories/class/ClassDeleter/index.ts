import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ClassDeleterRepo } from 'app/interfaces/class/ClassDeleterRepo'
import { NotFoundError } from 'domain/errors/NotFound'
import { Class } from 'domain/models/Class'
import { ClassDeleterParams } from 'domain/useCases/class/ClassDeleter'

import prisma from 'infra/prisma'
import { PrismaClassAdapter } from 'infra/prisma/adapters/ClassAdapter'

export class PrismaClassDeleterRepo
  extends PrismaClassAdapter
  implements ClassDeleterRepo
{
  async delete(params: ClassDeleterParams): Promise<Class> {
    try {
      const result = await prisma.class.delete({
        where: {
          id: params.id,
        },
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
