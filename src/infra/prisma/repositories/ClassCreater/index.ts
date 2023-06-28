import {
  ClassCreaterRepo,
  ClassCreaterRepoParams,
  ClassCreaterRepoResult,
} from 'app/interfaces/ClassCreaterRepo'

import prisma from 'infra/prisma'

export class PrismaClassCreaterRepo implements ClassCreaterRepo {
  async create({
    title,
  }: ClassCreaterRepoParams): Promise<ClassCreaterRepoResult> {
    const { id } = await prisma.class.create({
      data: {
        title,
      },
    })

    return {
      id: id.toString(),
      title,
    }
  }
}
