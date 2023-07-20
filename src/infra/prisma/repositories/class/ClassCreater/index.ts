import { ClassCreaterRepo } from 'app/interfaces/class/ClassCreaterRepo'
import { Class } from 'domain/models/Class'
import { ClassCreaterParams } from 'domain/useCases/class/ClassCreater'

import prisma from 'infra/prisma'
import { PrismaClassAdapter } from 'infra/prisma/adapters/ClassAdapter'

export class PrismaClassCreaterRepo
  extends PrismaClassAdapter
  implements ClassCreaterRepo
{
  async create({ title }: ClassCreaterParams): Promise<Class> {
    const result = await prisma.class.create({
      data: {
        title,
      },
      include: { classesSkills: { include: { skill: true } } },
    })

    return this.adapt(result)
  }
}
