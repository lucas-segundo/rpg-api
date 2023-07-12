import {
  ClassReaderRepo,
  ClassReaderRepoParams,
} from 'app/interfaces/class/ClassReaderRepo'
import { ClassRepo } from 'app/models/ClassRepo'

import prisma from 'infra/prisma'

export class PrismaClassReaderRepo implements ClassReaderRepo {
  async read({ id }: ClassReaderRepoParams): Promise<ClassRepo | null> {
    const result = await prisma.class.findFirst({
      where: {
        id,
      },
    })

    return result
  }
}
