import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import {
  ClassDeleterRepo,
  ClassDeleterRepoParams,
} from 'app/interfaces/ClassDeleterRepo'
import { ClassRepo } from 'app/models/ClassRepo'
import { NotFoundError } from 'domain/errors/NotFound'

import prisma from 'infra/prisma'

export class PrismaClassDeleterRepo implements ClassDeleterRepo {
  async delete(params: ClassDeleterRepoParams): Promise<ClassRepo> {
    try {
      const result = await prisma.class.update({
        where: {
          id: params.id,
        },
        data: {
          deletedAt: new Date().toISOString(),
        },
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
