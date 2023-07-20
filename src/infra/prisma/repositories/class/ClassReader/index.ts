import { ClassReaderRepo } from 'app/interfaces/class/ClassReaderRepo'
import { Class } from 'domain/models/Class'
import { ClassReaderParams } from 'domain/useCases/class/ClassReader'

import prisma from 'infra/prisma'
import { PrismaClassAdapter } from 'infra/prisma/adapters/ClassAdapter'

export class PrismaClassReaderRepo
  extends PrismaClassAdapter
  implements ClassReaderRepo
{
  async read({ id }: ClassReaderParams): Promise<Class | null> {
    const result = await prisma.class.findFirst({
      where: {
        id,
      },
      include: { classesSkills: { include: { skill: true } } },
    })

    return result && this.adapt(result)
  }
}
