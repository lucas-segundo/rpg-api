import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import {
  ClassDeleterRepo,
  ClassDeleterRepoParams,
} from 'app/interfaces/class/ClassDeleterRepo'
import { ClassRepo } from 'app/models/ClassRepo'
import { NotFoundError } from 'domain/errors/NotFound'

import prisma from 'infra/prisma'

export class PrismaClassDeleterRepo implements ClassDeleterRepo {
  async delete(params: ClassDeleterRepoParams): Promise<ClassRepo> {
    try {
      const result = await prisma.class.delete({
        where: {
          id: params.id,
        },
        include: { classesSkills: { include: { skill: true } } },
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
