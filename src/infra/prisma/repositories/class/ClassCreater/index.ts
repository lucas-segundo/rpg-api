import {
  ClassCreaterRepo,
  ClassCreaterRepoParams,
} from 'app/interfaces/class/ClassCreaterRepo'
import { ClassRepo } from 'app/models/ClassRepo'

import prisma from 'infra/prisma'

export class PrismaClassCreaterRepo implements ClassCreaterRepo {
  async create({ title }: ClassCreaterRepoParams): Promise<ClassRepo> {
    const result = await prisma.class.create({
      data: {
        title,
      },
    })

    return result
  }
}
